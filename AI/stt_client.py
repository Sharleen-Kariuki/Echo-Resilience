"""
stt_client.py

Handles the INBOUND direction: a community member calls in and records
feedback in their own dialect. This module transcribes it, translates it to
English, and extracts structured fields — the reverse of gemini_client.py.

Handoff boundary with the IVR teammate: they record the call and hand you a
file/URL. You turn it into transcribed + translated + structured data. You
never touch Africa's Talking; they never touch Gemini.
"""

import os
import json
import re
import time

from prompt_builder import FEEDBACK_SYSTEM_PROMPT

REQUIRED_FIELDS = {
    "raw_transcript", "translated_text", "detected_dialect",
    "hazard_type", "urgency_impression", "transcription_confidence",
}


class FeedbackProcessingError(Exception):
    pass


def _strip_json_fences(text: str) -> str:
    text = text.strip()
    text = re.sub(r"^```(json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    return text


def _parse_json_response(text: str) -> dict:
    """Parses the first complete JSON object, tolerating trailing extra text."""
    cleaned = _strip_json_fences(text)
    decoder = json.JSONDecoder()
    obj, _ = decoder.raw_decode(cleaned)
    return obj


def _validate(data: dict) -> list[str]:
    problems = []
    missing = REQUIRED_FIELDS - data.keys()
    if missing:
        problems.append(f"Missing fields: {missing}")
    valid_urgency = {"Low", "Moderate", "High", "Critical", "Unclear"}
    if "urgency_impression" in data and data["urgency_impression"] not in valid_urgency:
        problems.append(f"Invalid urgency_impression: {data.get('urgency_impression')}")
    conf = data.get("transcription_confidence")
    if conf is not None and not (0.0 <= float(conf) <= 1.0):
        problems.append(f"transcription_confidence out of range: {conf}")
    return problems


def transcribe_feedback(audio_path: str, dialect_hint: str | None = None,
                         model: str = "gemini-3.5-flash") -> dict:
    """
    Transcribes + translates + extracts structured data from a feedback
    audio recording.

    audio_path: local file path to the recording.
    dialect_hint: pass the caller's likely dialect if known (e.g. from their
                  registered community/region) — improves accuracy.

    Returns the parsed dict, with `needs_human_review` set True if
    validation fails or confidence is low.
    """
    try:
        import google.generativeai as genai
    except ImportError as e:
        raise FeedbackProcessingError(
            "google-generativeai not installed. Run: pip install google-generativeai --break-system-packages"
        ) from e

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise FeedbackProcessingError("GEMINI_API_KEY environment variable not set.")

    genai.configure(api_key=api_key)

    # Read the audio file directly and send it inline in the request rather
    # than using genai.upload_file() — that function relies on a separate
    # "Files API" discovery endpoint that's unreliable in the now-deprecated
    # google.generativeai package. Sending audio inline avoids it entirely
    # and works fine for short feedback clips (well under the ~20MB inline limit).
    with open(audio_path, "rb") as f:
        audio_bytes = f.read()

    hint_text = f"\nThe caller is likely speaking {dialect_hint}." if dialect_hint else ""
    user_prompt = (
        f"Transcribe, translate, and extract structured data from this audio "
        f"recording of a community feedback call.{hint_text}\n"
        f"Return only the JSON object, nothing else."
    )

    last_error = None
    for attempt in range(3):
        try:
            gen_model = genai.GenerativeModel(model_name=model, system_instruction=FEEDBACK_SYSTEM_PROMPT)
            response = gen_model.generate_content(
                [user_prompt, {"mime_type": "audio/wav", "data": audio_bytes}],
                generation_config={"temperature": 0.2, "response_mime_type": "application/json"},
            )
            data = _parse_json_response(response.text)
            problems = _validate(data)
            data["needs_human_review"] = bool(problems) or data.get("transcription_confidence", 1.0) < 0.5
            data["_validation_warnings"] = problems
            return data
        except json.JSONDecodeError as e:
            last_error = e
            continue
        except Exception as e:
            if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
                wait = 20 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s before retry...")
                time.sleep(wait)
                last_error = e
                continue
            raise

    raise FeedbackProcessingError(f"Failed after 3 attempts. Last error: {last_error}")