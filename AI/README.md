# EchoResilience AI Module — Simplify / Translate / Voice (v2, clean build)

AI/NLP component for the ICPAC alert pipeline. Scope: **Somali and Amharic
only**, for a focused hackathon demo. Handles both directions:

- **Outbound:** raw alert → simplified → translated → structured data → audio
- **Inbound:** community feedback call → transcribed → translated → structured data

## Files

| File | Purpose |
|---|---|
| `prompt_builder.py` | Prompts for both pipelines (outbound alert + inbound feedback) |
| `gemini_client.py` | Outbound: simplify + translate + extract |
| `tts_client.py` | Outbound: translated text → audio file |
| `stt_client.py` | Inbound: feedback audio → transcript + translation + extraction |
| `test_pipeline.py` | Test the outbound text pipeline |
| `test_tts.py` | Test audio generation |
| `test_feedback_pipeline.py` | Test the inbound pipeline (round-trips through TTS since you don't have real recordings yet) |

## Setup

```bash
python -m venv venv
venv\Scripts\activate          # Windows
pip install google-generativeai --break-system-packages
```
Get a key at https://aistudio.google.com/apikey, then:
```powershell
$env:GEMINI_API_KEY="your-key-here"
```

## Run it, in order

```powershell
python test_pipeline.py --dry-run     # 1. sanity-check code, no key needed
python test_pipeline.py               # 2. real simplify+translate+extract
python test_tts.py                    # 3. generate audio, then LISTEN to the files
python test_feedback_pipeline.py      # 4. test the inbound direction
```

Each live run takes about a minute — there's a 15-second pause between calls
to stay under the free tier's 5-requests-per-minute limit.

## What to actually check (not just "does it run")

- Open every `.wav` file in `generated_audio/` and listen. Does it sound
  clear and natural, not robotic or garbled?
- If you know a Somali or Amharic speaker, show them a few `translated_text`
  outputs and a couple of audio clips — 5 minutes of their time is worth
  more than any amount of code review here.

## Endpoints for your backend teammate

| Endpoint | Calls | Purpose |
|---|---|---|
| `POST /api/alerts/{id}/process` | `process_alert()` | Simplify + translate + extract from a raw alert |
| `POST /api/alerts/{id}/generate-audio` | `generate_audio()` | Translated text → playable audio file |
| `GET /api/alerts/{id}/audio/{dialect}` | — | Serves the audio file — this is what the **IVR teammate** calls |
| `POST /api/feedback/{id}/process` | `transcribe_feedback()` | Recorded feedback call → transcript + English translation + hazard guess |
| `GET /api/dialects` | — | Returns `["Somali", "Amharic"]` so the frontend only offers what's actually supported |

### Example FastAPI wiring

```python
from gemini_client import process_alert
from tts_client import generate_audio
from stt_client import transcribe_feedback

@app.post("/api/alerts/{alert_id}/process")
def process(alert_id: int, dialect: str, raw_text: str, severity: str):
    result = process_alert(raw_text, dialect, severity)
    # Save result["simplified_en"], result["translated_text"] to alert_history
    return result

@app.post("/api/alerts/{alert_id}/generate-audio")
def audio(alert_id: int, translated_text: str, dialect: str):
    path = generate_audio(translated_text, dialect, str(alert_id))
    # Save path/URL to alert_history.audio_url
    return {"audio_path": path}

@app.post("/api/feedback/{feedback_id}/process")
def feedback(feedback_id: int, audio_local_path: str, dialect_hint: str = None):
    result = transcribe_feedback(audio_local_path, dialect_hint)
    # Save result["translated_text"], result["hazard_type"] to feedback_logs
    return result
```

## Schema notes to raise with your backend teammate

- `alert_history` needs `simplified_text`, `translated_text`, `audio_url` columns.
- `feedback_logs.hazard_type_id` is `NOT NULL`, but STT can legitimately
  return `"Unclear"` — make it nullable or add an "Unclear" row to
  `hazard_types` so inserts don't fail.
- `feedback_logs` has no `needs_human_review` flag — useful for the Feedback
  Detail screen to surface low-confidence entries for a person to check.

## Boundary with the IVR teammate

- **You own:** producing a finished audio file, and turning their recorded
  feedback audio into text.
- **They own:** dialing numbers, playing whatever audio file you hand them,
  capturing keypad input, saving the recording and giving you its path.
- **Don't** let them use Africa's Talking's built-in `<Say>` TTS for Somali
  or Amharic — its voice coverage is unreliable. Always use your generated
  audio file instead.