# EchoResilience AI Module — Simplify / Translate / Extract

This is the AI component for the ICPAC alert pipeline: takes a raw scientific
alert, simplifies it, translates it into the target community dialect, and
extracts structured fields (hazard type, urgency, recommended action) — all
in a single Gemini call, returned as validated JSON ready for FastAPI to
insert into `alert_history`.

## Files

| File | Purpose |
|---|---|
| `prompt_builder.py` | System prompt + few-shot examples that anchor tone, length, and JSON shape |
| `gemini_client.py` | Calls Gemini, parses/validates JSON, retries once on malformed output |
| `turkana_templates.py` | Phrase-bank fallback for Turkana (not covered by mainstream MT — see note below) |
| `test_pipeline.py` | Test harness — run this first |

## Setup

```bash
pip install google-genai --break-system-packages
export GEMINI_API_KEY="your-key-here"   # get one at https://aistudio.google.com/apikey
```

## Run it

```bash
# Sanity-check the code logic without needing an API key yet:
python test_pipeline.py --dry-run

# Once you have a key, test real model output quality:
python test_pipeline.py
```

Read the printed output for each test alert/dialect pair. What to look for:

- **`simplified_en`** — is it actually simple? Would someone with no science
  background understand it in one read/listen? Is it under 300 chars?
- **`translated_text`** — if you have a native speaker on the team (or can
  reach one), get them to sanity-check a few outputs per dialect. This is
  the single biggest quality risk in the whole project — LLM translation
  quality for Somali/Oromo/Amharic varies a lot by domain and phrasing.
- **`translation_confidence`** — Gemini's own self-rating. Don't fully trust
  it, but low scores are worth a second look.
- **`_validation_warnings`** — should be empty. If you see warnings on most
  outputs, tighten the system prompt in `prompt_builder.py` rather than
  patching around it in code.

## Why Turkana is handled differently

Turkana is not covered by NLLB-200 or reliably by general-purpose LLMs — it's
a low-resource Nilotic language with very little training data available
anywhere. Rather than let Gemini "translate" into Turkana with no way to
verify the output, `turkana_templates.py` uses a pre-approved phrase bank:
Gemini still extracts hazard/urgency/action from English (that part is
reliable), then we slot-fill a verified Turkana template for that
hazard+urgency combo. If no template exists, the alert is flagged
`needs_human_review` and shown in English rather than auto-sent.

**Before demo day:** the templates in `TURKANA_PHRASE_BANK` are placeholders
marked `"verified": False` — get an actual Turkana speaker to review/correct
them, then flip `verified` to `True`. This is honestly a stronger talking
point for judges than pretending an LLM can translate Turkana — it shows you
understood the low-resource-language problem rather than glossing over it.

## The TTS piece — and where your responsibility ends

Your pipeline now goes: **simplify → translate → extract → generate audio file.**
That last step uses `tts_client.py`, which calls Gemini's native TTS model
(same API key, no new credentials needed).

```bash
python test_tts.py   # generates .wav files in generated_audio/, listen to them
```

**This is the exact handoff boundary with your IVR teammate:**

- **You own:** turning text into a finished, verified audio file.
- **They own:** dialing the phone, playing whatever audio file you give them
  (via Africa's Talking's `<Play url="...">` action), handling keypad input,
  and recording responses.
- **The interface between you:** a file path or public URL. Nothing else.
  You never touch their Africa's Talking account/webhooks; they never touch
  your Gemini key or prompts.

**Do not let your teammate use Africa's Talking's built-in `<Say>` text-to-speech
for Somali, Oromo, or Turkana.** `<Say>` uses standard Google Cloud TTS voices
under the hood, and that voice set's coverage of these dialects is unreliable
to nonexistent — it could silently produce a robotic or wrong-language voice
during your demo. Generating the audio yourself with `tts_client.py` means
you control and can verify quality before it ever reaches a phone call.

**For Turkana specifically:** don't use synthetic TTS at all, even if Gemini's
model technically attempts it. Extend the same "human-verified phrase bank"
approach you're already using for Turkana text — get a Turkana speaker to
record real audio for your ~5-10 template phrases, save those as static
`.wav`/`.mp3` files, and hand those to your teammate directly instead of
generating anything synthetically. This is both safer and, honestly, sounds
better than any TTS model would for a low-resource language.

**Once you have working audio files**, the only thing you hand your IVR
teammate is: a way to fetch the right audio file for a given alert + dialect
(e.g. a `/api/alert-audio/{alert_id}/{dialect}` endpoint your backend
teammate exposes, or a shared folder/cloud bucket with predictable filenames).
You don't need to know anything about how Africa's Talking works to finish
your part.

## Wiring into FastAPI


Your backend teammate's endpoint should call:

```python
from gemini_client import process_alert
from turkana_templates import get_turkana_message

@app.post("/api/translate-alert")
def translate_alert(alert_id: int, region_id: int, dialect: str, raw_text: str, severity: str):
    if dialect in SUPPORTED_AI_DIALECTS:
        result = process_alert(raw_text, dialect, severity)
    else:  # Turkana
        extraction = process_alert(raw_text, "Somali", severity)  # reuse extraction
        turkana = get_turkana_message(extraction["hazard_type"], extraction["urgency"], extraction["simplified_en"])
        result = {**extraction, **turkana}
    # Save result["simplified_en"], result["translated_text"], etc. to alert_history
    return result
```

Flag to your backend teammate: `alert_history` currently has no columns to
store `simplified_text`, `translated_text`, or `audio_url` — add those
before this can persist anything.