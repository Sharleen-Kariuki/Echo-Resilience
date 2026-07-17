"""
tts_client.py

Converts translated text into an audio file using Gemini's native TTS model.
Same API key as gemini_client.py — no separate Google Cloud setup needed.

Handoff boundary with the IVR teammate: this module produces a finished
audio file. Your teammate's Africa's Talking code just plays whatever file
you hand them via <Play url="...">. Don't let them use Africa's Talking's
built-in <Say> TTS for these dialects — its voice coverage for Somali and
Amharic is unreliable; generating the audio yourself here keeps quality
under your control.
"""

import os
import wave
import time

AUDIO_OUTPUT_DIR = "generated_audio"


def _save_wave_file(filename: str, pcm_data: bytes, channels=1, rate=24000, sample_width=2):
    os.makedirs(os.path.dirname(filename) or ".", exist_ok=True)
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm_data)


def generate_audio(text: str, dialect: str, alert_id: str,
                    model: str = "gemini-2.5-flash-preview-tts") -> str:
    """
    Converts `text` into a .wav file. Returns the local file path.

    Retries on rate limits, and raises a clear error (instead of crashing
    with an IndexError) if Gemini returns no usable audio — which can
    happen silently on a rate-limit hiccup or a content-safety block.
    """
    try:
        import google.generativeai as genai
    except ImportError as e:
        raise RuntimeError(
            "google-generativeai not installed. Run: pip install google-generativeai --break-system-packages"
        ) from e

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY environment variable not set.")

    genai.configure(api_key=api_key)

    style_prompt = (
        f"Say in a calm, clear, steady voice suitable for an urgent public safety "
        f"announcement, at a moderate pace so it's easy to follow over a phone line: {text}"
    )

    tts_model = genai.GenerativeModel(model_name=model)

    last_error = None
    for attempt in range(3):
        try:
            response = tts_model.generate_content(
                style_prompt,
                generation_config={"response_modalities": ["AUDIO"]},
            )

            if not response.candidates:
                reason = getattr(response, "prompt_feedback", None)
                last_error = f"No candidates returned (prompt_feedback: {reason})"
                wait = 15 * (attempt + 1)
                print(f"  Empty response, waiting {wait}s before retry... ({last_error})")
                time.sleep(wait)
                continue

            candidate = response.candidates[0]
            finish_reason = getattr(candidate, "finish_reason", None)
            parts = getattr(candidate.content, "parts", None)

            if not parts or not getattr(parts[0], "inline_data", None) or not parts[0].inline_data.data:
                last_error = f"Candidate had no usable audio data (finish_reason: {finish_reason})"
                wait = 15 * (attempt + 1)
                print(f"  Empty audio content, waiting {wait}s before retry... ({last_error})")
                time.sleep(wait)
                continue

            pcm_data = parts[0].inline_data.data
            safe_dialect = dialect.lower().replace(" ", "_")
            filename = os.path.join(AUDIO_OUTPUT_DIR, f"alert_{alert_id}_{safe_dialect}.wav")
            _save_wave_file(filename, pcm_data)
            return filename

        except Exception as e:
            if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
                wait = 20 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s before retry...")
                time.sleep(wait)
                last_error = e
                continue
            raise

    raise RuntimeError(f"Failed to generate audio after 3 attempts. Last error: {last_error}")