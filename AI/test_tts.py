"""
test_tts.py

Generates sample audio for Somali and Amharic. Run this, then actually
listen to the .wav files in generated_audio/ — that's the real test.

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
        "text": "ለሁለት የዝናብ ወቅቶች በጣም ትንሽ ዝናብ ወርዷል። እንስሳትን ወደ ውሃ ምንጮች ቀድመው ያንቀሳቅሱ።",
        "dialect": "Amharic",
        "alert_id": "test002",
    },
]

if __name__ == "__main__":
    for sample in SAMPLE_TEXTS:
        print(f"\nGenerating audio for {sample['dialect']}...")
        try:
            path = generate_audio(sample["text"], sample["dialect"], sample["alert_id"])
            print(f"  ✓ Saved to: {path}")
        except Exception as e:
            print(f"  ✗ Failed: {e}")

    print("\nDone. Open the generated_audio/ folder and listen to each file.")