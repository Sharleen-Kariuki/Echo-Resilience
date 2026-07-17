"""
test_feedback_pipeline.py

Tests the inbound speech-to-text pipeline. Since you don't have real
recorded feedback yet, this generates sample audio with tts_client.py first,
then feeds it into stt_client.py to test the round trip.

Usage:
  export GEMINI_API_KEY="your-key-here"
  python test_feedback_pipeline.py
"""

import time

from tts_client import generate_audio
from stt_client import transcribe_feedback, FeedbackProcessingError

SAMPLE_FEEDBACK = [
    {
        "text": "Waxaan arkay biyo badan oo qulqulaya dhulkayaga. Waan baqanaynaa.",
        "dialect": "Somali",
    },
    {
        "text": "በጣም ብዙ ዝናብ ወርዷል እና ጎርፍ ተከስቷል። እርዳታ እንፈልጋለን።",
        "dialect": "Amharic",
    },
]

if __name__ == "__main__":
    for i, sample in enumerate(SAMPLE_FEEDBACK):
        print(f"\n{'=' * 60}")
        print(f"Testing round trip for {sample['dialect']}")
        print(f"Original text: {sample['text']}")

        try:
            print("\n[1/2] Generating sample audio...")
            audio_path = generate_audio(sample["text"], sample["dialect"], f"feedback_test_{i}")
            print(f"  ✓ Generated: {audio_path}")

            print("\n(pausing 15s to stay under free-tier rate limit...)")
            time.sleep(15)

            print("[2/2] Running speech-to-text...")
            result = transcribe_feedback(audio_path, dialect_hint=sample["dialect"])
            for key, value in result.items():
                print(f"  {key}: {value}")

            print("  ⚠ Flagged for human review" if result.get("needs_human_review")
                  else "  ✓ Processed with acceptable confidence")

        except FeedbackProcessingError as e:
            print(f"  ✗ ERROR: {e}")

        if i < len(SAMPLE_FEEDBACK) - 1:
            print("\n(pausing 15s before next test...)")
            time.sleep(15)