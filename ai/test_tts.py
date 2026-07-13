"""
test_tts.py

Test the text-to-speech step on its own, separate from test_pipeline.py,
so you can iterate on audio quality without re-running the full text
pipeline each time.

Usage:
  export GEMINI_API_KEY="your-key-here"
  python test_tts.py
"""

from tts_client import generate_audio

SAMPLE_TEXTS = [
    {
        "text": "Digniin: roob aad u xoog badan ayaa soo socda berri. Hadda u guuri qoyskaaga meel sare.",
        "dialect": "Somali",
        "alert_id": "test001",
    },
    {
        "text": "በማርሳቢት ለሁለት የዝናብ ወቅቶች በጣም ትንሽ ዝናብ ወርዷል። እንስሳትን ወደ ውሃ ምንጮች ቀድመው ያንቀሳቅሱ።",
        "dialect": "Amharic",
        "alert_id": "test002",
    },
    {
        "text": "Makundi ya nzige yanasogea kuelekea mashambani. Ripoti mara moja ukiona nzige.",
        "dialect": "Swahili",
        "alert_id": "test003",
    },
]

if __name__ == "__main__":
    for sample in SAMPLE_TEXTS:
        print(f"\nGenerating audio for {sample['dialect']}...")
        try:
            path = generate_audio(sample["text"], sample["dialect"], sample["alert_id"])
            print(f"  ✓ Saved to: {path}")
            print(f"  → Play this file and judge for yourself: does it sound intelligible?")
        except Exception as e:
            print(f"  ✗ Failed: {e}")

    print("\nDone. Listen to each .wav file in the generated_audio/ folder.")
    print("If a dialect sounds robotic/wrong/unintelligible, don't use Gemini TTS")
    print("for it — fall back to a human-recorded clip instead (same approach")
    print("as the Turkana phrase bank).")