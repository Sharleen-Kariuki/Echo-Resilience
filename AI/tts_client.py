"""
tts_client.py

Converts your pipeline's translated_text into an actual audio file, using
Gemini's native TTS model (same API key as gemini_client.py — no separate
Google Cloud service account needed).

WHY THIS EXISTS / DIVISION OF LABOUR:
This is the boundary between the AI team (you) and the IVR team (teammate).
You produce a finished audio file. Your teammate's Africa's Talking code
just points <Play url="..."> at whatever you hand them. Neither of you
touches the other's code or credentials.

DO NOT rely on Africa's Talking's built-in <Say> text-to-speech for Somali,
Oromo, or Turkana — it's powered by standard Google Cloud TTS voices, whose
coverage for these dialects is inconsistent to nonexistent. Generating the
audio yourself here means you control and can verify quality before it ever
reaches a phone call.

Requires: pip install google-genai --break-system-packages
(same package/key you already set up for gemini_client.py)
"""

import os
import wave

# Gemini TTS confirms native support for languages including Amharic and
# Swahili. Somali/Oromo coverage is less certain — TEST_QUALITY before
# trusting it for a demo. Turkana is not expected to be supported at all.
GEMINI_TTS_DIALECTS = ["Amharic", "Swahili", "Somali", "Oromo"]

AUDIO_OUTPUT_DIR = "generated_audio"


def _save_wave_file(filename: str, pcm_data: bytes, channels=1, rate=24000, sample_width=2):
    os.makedirs(os.path.dirname(filename) or ".", exist_ok=True)
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm_data)


def generate_audio(text: str, dialect: str, alert_id: str, model: str = "gemini-2.5-flash-preview-tts") -> str:
    """
    Converts `text` (already translated/simplified) into a .wav file using
    Gemini's TTS model.

    Returns the local file path. In production, your backend teammate (or
    you) should upload this to public cloud storage (S3, Cloud Storage,
    even a simple static file host) and hand THAT public URL to the IVR
    teammate for <Play url="...">.

    For a hackathon demo, serving the file from a simple static folder your
    FastAPI app exposes is enough — you don't need real cloud storage to
    prove the concept.
    """
    try:
        from google import genai
        from google.genai import types
    except ImportError as e:
        raise RuntimeError(
            "google-genai not installed. Run: "
            "pip install google-genai --break-system-packages"
        ) from e

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY environment variable not set.")

    client = genai.Client(api_key=api_key)

    # Keep the delivery style consistent and calm — this is a disaster alert,
    # not a commercial. Clear, steady, moderate pace, no dramatization.
    style_prompt = (
        f"Say in a calm, clear, steady voice suitable for an urgent public "
        f"safety announcement, at a moderate pace so it's easy to follow "
        f"over a phone line: {text}"
    )

    response = client.models.generate_content(
        model=model,
        contents=style_prompt,
        config=types.GenerateContentConfig(response_modalities=["AUDIO"]),
    )

    pcm_data = response.candidates[0].content.parts[0].inline_data.data

    safe_dialect = dialect.lower().replace(" ", "_")
    filename = os.path.join(AUDIO_OUTPUT_DIR, f"alert_{alert_id}_{safe_dialect}.wav")
    _save_wave_file(filename, pcm_data)

    return filename


def generate_audio_for_alert(alert_result: dict, alert_id: str) -> dict:
    """
    Convenience wrapper: takes the dict returned by gemini_client.process_alert()
    or turkana_templates.get_turkana_message(), generates audio if the dialect
    is supported, and returns the result with an added 'audio_path' key.

    If the dialect isn't TTS-supported (or has needs_human_review=True, as
    Turkana templates do), audio_path is None and a note explains why —
    that alert should use a pre-recorded human audio clip instead, not
    synthetic TTS.
    """
    dialect = alert_result.get("target_dialect", "")
    text = alert_result.get("translated_text", "")

    # Never auto-generate speech for content that's flagged as unverified —
    # audio makes an unverified translation feel more "official" and more
    # likely to be trusted/acted on by a listener, which raises the stakes
    # of it being wrong.
    if alert_result.get("needs_human_review"):
        return {
            **alert_result,
            "audio_path": None,
            "audio_note": "Skipped TTS: this text is flagged needs_human_review. "
            "Use a pre-recorded, human-verified audio clip instead.",
        }

    base_dialect = dialect.split(" ")[0]  # handles "Turkana (fallback: ...)" etc.
    if base_dialect not in GEMINI_TTS_DIALECTS:
        return {
            **alert_result,
            "audio_path": None,
            "audio_note": f"'{dialect}' not in tested TTS dialect list. "
            f"Verify support before relying on it, or use pre-recorded audio.",
        }

    audio_path = generate_audio(text, dialect, alert_id)
    return {**alert_result, "audio_path": audio_path, "audio_note": None}