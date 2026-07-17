"""
gemini_client.py

Calls Gemini for the outbound alert pipeline: simplify + translate + extract.
Parses and validates the JSON response, retries on rate limits.

Setup:
  pip install google-generativeai --break-system-packages
  export GEMINI_API_KEY="your-key-here"
"""

import os
import json
import re
import time

from prompt_builder import build_prompt, SUPPORTED_DIALECTS

REQUIRED_FIELDS = {
    "hazard_type", "urgency", "recommended_action",
    "simplified_en", "translated_text", "target_dialect", "translation_confidence",
}
SMS_CHAR_LIMIT = 300


class AlertProcessingError(Exception):
    pass


def _strip_json_fences(text: str) -> str:
    text = text.strip()
    text = re.sub(r"^```(json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    return text


def _parse_json_response(text: str) -> dict:
    """
    Parses the first complete JSON object out of the model's response, even
    if there's trailing extra text after it (Gemini occasionally appends
    stray content despite response_mime_type=application/json). Using
    raw_decode instead of json.loads avoids failing on that extra data.
    """
    cleaned = _strip_json_fences(text)
    decoder = json.JSONDecoder()
    obj, _ = decoder.raw_decode(cleaned)
    return obj


def _validate(data: dict) -> list[str]:
    problems = []
    missing = REQUIRED_FIELDS - data.keys()
    if missing:
        problems.append(f"Missing fields: {missing}")
    if "simplified_en" in data and len(data["simplified_en"]) > SMS_CHAR_LIMIT:
        problems.append(f"simplified_en exceeds {SMS_CHAR_LIMIT}-char SMS limit")
    if "urgency" in data and data["urgency"] not in {"Low", "Moderate", "High", "Critical"}:
        problems.append(f"Invalid urgency: {data.get('urgency')}")
    conf = data.get("translation_confidence")
    if conf is not None and not (0.0 <= float(conf) <= 1.0):
        problems.append(f"translation_confidence out of range: {conf}")
    return problems


def process_alert(raw_alert: str, target_dialect: str, severity_level: str | None = None,
                   model: str = "gemini-3.5-flash") -> dict:
    """
    Full outbound pipeline: build prompt -> call Gemini -> parse -> validate.
    Retries on malformed JSON or rate limits (429).
    """
    if target_dialect not in SUPPORTED_DIALECTS:
        raise ValueError(f"'{target_dialect}' not supported. Choose from: {SUPPORTED_DIALECTS}")

    try:
        import google.generativeai as genai
    except ImportError as e:
        raise AlertProcessingError(
            "google-generativeai not installed. Run: pip install google-generativeai --break-system-packages"
        ) from e

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise AlertProcessingError("GEMINI_API_KEY environment variable not set.")

    genai.configure(api_key=api_key)
    prompt = build_prompt(raw_alert, target_dialect, severity_level)
    gen_model = genai.GenerativeModel(model_name=model, system_instruction=prompt["system"])

    last_error = None
    for attempt in range(3):
        try:
            response = gen_model.generate_content(
                prompt["user"],
                generation_config={"temperature": 0.3, "response_mime_type": "application/json"},
            )
            data = _parse_json_response(response.text)
            data["_validation_warnings"] = _validate(data)
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

    raise AlertProcessingError(f"Failed after 3 attempts. Last error: {last_error}")