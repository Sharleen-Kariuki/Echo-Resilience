"""
turkana_templates.py

Turkana is not covered by NLLB-200, M2M100, or reliably by Gemini — it's an
extremely low-resource Nilotic language with almost no parallel training data.
Rather than let an LLM hallucinate a "translation" with no way to verify it,
we use a curated phrase-bank + slot-filling approach:

1. Gemini still does hazard/urgency/action EXTRACTION from the raw English alert
   (this step doesn't require Turkana knowledge, so it's reliable).
2. We map (hazard_type, urgency) -> a pre-approved Turkana message template,
   written/verified by a Turkana speaker ahead of time.
3. If no exact template match exists, we fall back to English + flag the
   alert for human review before it's sent (never send unverified text).

This is a legitimate, defensible design choice for a hackathon demo — it shows
you understood the low-resource-language problem rather than papering over it.
Replace/expand TURKANA_PHRASE_BANK with real translations from a Turkana
speaker before demo day; the ones below are PLACEHOLDERS for structure only
and must not be presented as verified translations.
"""

# PLACEHOLDER templates — replace with verified Turkana before using in a demo.
# Keyed by (hazard_type, urgency). Extend as needed.
TURKANA_PHRASE_BANK = {
    ("Flood", "Critical"): {
        "template": "[VERIFY WITH SPEAKER] Heavy rain warning. Move to high ground now.",
        "verified": False,
    },
    ("Flood", "High"): {
        "template": "[VERIFY WITH SPEAKER] Heavy rain expected. Prepare to move to high ground.",
        "verified": False,
    },
    ("Drought", "High"): {
        "template": "[VERIFY WITH SPEAKER] Little rain expected. Move animals to water sources early.",
        "verified": False,
    },
    ("Locust", "High"): {
        "template": "[VERIFY WITH SPEAKER] Locusts reported nearby. Protect crops and grazing land.",
        "verified": False,
    },
}


def get_turkana_message(hazard_type: str, urgency: str, simplified_en: str) -> dict:
    """
    Look up a pre-approved Turkana template for this hazard/urgency pair.

    Returns a dict with:
      - translated_text: the Turkana message, OR the English fallback
      - target_dialect: "Turkana"
      - translation_confidence: 1.0 only if a verified template was used
      - needs_human_review: True if we fell back to English (no unverified
        text should ever be auto-sent to a community)
    """
    entry = TURKANA_PHRASE_BANK.get((hazard_type, urgency))

    if entry and entry["verified"]:
        return {
            "translated_text": entry["template"],
            "target_dialect": "Turkana",
            "translation_confidence": 1.0,
            "needs_human_review": False,
        }

    if entry and not entry["verified"]:
        # Template exists but hasn't been signed off by a Turkana speaker yet.
        return {
            "translated_text": entry["template"],
            "target_dialect": "Turkana",
            "translation_confidence": 0.3,
            "needs_human_review": True,
        }

    # No template at all for this hazard/urgency combo — fall back to English
    # and force a human review flag rather than guessing.
    return {
        "translated_text": simplified_en,
        "target_dialect": "Turkana (fallback: English shown, awaiting translation)",
        "translation_confidence": 0.0,
        "needs_human_review": True,
    }