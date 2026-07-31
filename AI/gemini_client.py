"""
gemini_client.py

Thin wrapper around the Gemini API for the EchoResilience simplify+translate+
extract call. Handles:
  - Calling the model with the prompt from prompt_builder.py
  - Forcing/parsing JSON output safely (models sometimes wrap JSON in
    ```json fences even when told not to — we strip that defensively)
  - Basic validation against the expected schema and SMS length rule
  - Retrying once on a malformed response before giving up

Requires: pip install google-genai --break-system-packages
Set your key: export GEMINI_API_KEY="your-key-here"
"""

import os
import json
import re
import pathlib

# ─── Load AI/.env early (zero dependencies) ──────────────────────────────────
def _load_dotenv():
    env_file = pathlib.Path(__file__).parent / '.env'
    if not env_file.exists():
        return
    for raw in env_file.read_text(encoding='utf-8').splitlines():
        line = raw.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, _, val = line.partition('=')
        val = val.strip().strip('"').strip("'")
        os.environ.setdefault(key.strip(), val)

_load_dotenv()

from prompt_builder import build_messages, SUPPORTED_AI_DIALECTS

REQUIRED_FIELDS = {
    "hazard_type",
    "urgency",
    "recommended_action",
    "simplified_en",
    "translated_text",
    "target_dialect",
    "translation_confidence",
}

SMS_CHAR_LIMIT = 300


class AlertProcessingError(Exception):
    pass


def _strip_json_fences(text: str) -> str:
    """Models sometimes wrap JSON in ```json ... ``` despite instructions not to."""
    text = text.strip()
    text = re.sub(r"^```(json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    return text


def _validate_response(data: dict) -> list[str]:
    """Return a list of validation problems (empty list = valid)."""
    problems = []
    missing = REQUIRED_FIELDS - data.keys()
    if missing:
        problems.append(f"Missing fields: {missing}")

    if "simplified_en" in data and len(data["simplified_en"]) > SMS_CHAR_LIMIT:
        problems.append(
            f"simplified_en is {len(data['simplified_en'])} chars, "
            f"exceeds SMS limit of {SMS_CHAR_LIMIT}"
        )

    if "urgency" in data and data["urgency"] not in {"Low", "Moderate", "High", "Critical"}:
        problems.append(f"Invalid urgency value: {data.get('urgency')}")

    conf = data.get("translation_confidence")
    if conf is not None and not (0.0 <= float(conf) <= 1.0):
        problems.append(f"translation_confidence out of range: {conf}")

    return problems


def call_gemini(system_prompt: str, user_prompt: str, model: str = "gemini-flash-latest") -> str:
    """
    Calls the Gemini API and returns the raw text response.
    Isolated into its own function so it's easy to swap models or mock in tests.
    """
    try:
        from google import genai
        from google.genai import types
    except ImportError as e:
        raise AlertProcessingError(
            "google-genai not installed. Run: "
            "pip install google-genai --break-system-packages"
        ) from e

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise AlertProcessingError(
            "GEMINI_API_KEY environment variable not set. "
            "Get a key from https://aistudio.google.com/apikey and export it."
        )

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model=model,
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.3,
            response_mime_type="application/json",
        ),
    )
    return response.text


def process_alert(raw_alert: str, target_dialect: str, severity_level: str | None = None) -> dict:
    """
    Full pipeline: build prompt -> call Gemini -> parse -> validate.
    Retries once on a malformed/invalid response.

    Returns the parsed dict (matching the schema in prompt_builder.py) plus
    a "_validation_warnings" key (empty list if clean).
    """
    if target_dialect not in SUPPORTED_AI_DIALECTS:
        raise ValueError(
            f"'{target_dialect}' isn't in the Gemini pipeline's supported list "
            f"{SUPPORTED_AI_DIALECTS}. Use turkana_templates.get_turkana_message() "
            f"for Turkana, or add the dialect to prompt_builder.SUPPORTED_AI_DIALECTS "
            f"once you've tested translation quality for it."
        )

    prompt = build_messages(raw_alert, target_dialect, severity_level)

    import time

    last_error = None
    for attempt in range(3):
        try:
            raw_text = call_gemini(prompt["system"], prompt["user"])
            cleaned = _strip_json_fences(raw_text)
            data = json.loads(cleaned)
            problems = _validate_response(data)
            data["_validation_warnings"] = problems
            return data
        except (json.JSONDecodeError, AlertProcessingError) as e:
            last_error = e
            continue
        except Exception as e:
            # Free-tier rate limit (429 RESOURCE_EXHAUSTED) — back off and retry
            # rather than crashing the whole pipeline on one throttled call.
            if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
                wait_seconds = 20 * (attempt + 1)
                print(f"  Rate limited, waiting {wait_seconds}s before retry...")
                time.sleep(wait_seconds)
                last_error = e
                continue
            raise

    raise AlertProcessingError(
        f"Failed to get valid JSON from Gemini after 3 attempts. Last error: {last_error}"
    )


def transcribe_feedback(audio_file_path: str, dialect_hint: str | None = None) -> dict:
    """
    Transcribes audio feedback in its native language, translates the transcription to English,
    and categorises the hazard type. Returns a dict:
      { "transcription_text": "...", "translated_text": "...", "hazard_type": "..." }
    """
    try:
        from google import genai
        from google.genai import types
    except ImportError as e:
        raise AlertProcessingError(
            "google-genai not installed. Run: "
            "pip install google-genai --break-system-packages"
        ) from e

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise AlertProcessingError("GEMINI_API_KEY environment variable not set.")

    if not os.path.exists(audio_file_path):
        raise FileNotFoundError(f"Audio feedback file not found: {audio_file_path}")

    # Determine MIME type
    mime_type = "audio/wav"
    ext = audio_file_path.lower().split('.')[-1]
    if ext == "mp3":
        mime_type = "audio/mp3"
    elif ext in ("m4a", "mp4"):
        mime_type = "audio/m4a"
    elif ext == "ogg":
        mime_type = "audio/ogg"

    try:
        with open(audio_file_path, "rb") as f:
            audio_bytes = f.read()
    except Exception as e:
        raise AlertProcessingError(f"Failed to read audio file: {e}")

    client = genai.Client(api_key=api_key)

    system_prompt = (
        "You are an audio processing agent for EchoResilience. Your task is to transcribe, "
        "translate, and categorize community feedback audio."
    )

    prompt = (
        "You are provided with a community audio recording containing voice feedback. "
        "Please do the following:\n"
        "1. Transcribe the audio exactly in the original language spoken.\n"
        "2. Translate the transcription into English.\n"
        "3. Categorize the hazard type mentioned or implied (e.g. Flood, Drought, Locust, Extreme Heat, None).\n\n"
    )
    if dialect_hint:
        prompt += f"Note: The speaker is likely speaking in or around the dialect '{dialect_hint}'.\n"

    prompt += (
        "Output ONLY a valid JSON object in this exact shape:\n"
        "{\n"
        "  \"transcription_text\": \"the transcription of the audio in its original language\",\n"
        "  \"translated_text\": \"the English translation of the transcription\",\n"
        "  \"hazard_type\": \"Flood | Drought | Locust | Extreme Heat | None\"\n"
        "}"
    )

    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=[
                types.Part.from_bytes(data=audio_bytes, mime_type=mime_type),
                prompt,
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                temperature=0.2,
                response_mime_type="application/json",
            ),
        )
        cleaned = _strip_json_fences(response.text)
        return json.loads(cleaned)
    except Exception as e:
        raise AlertProcessingError(f"Gemini feedback transcription request failed: {e}")