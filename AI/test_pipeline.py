"""
test_pipeline.py

Run this to test the simplify+translate+extract pipeline against sample
alerts before wiring it into FastAPI.

Usage:
  export GEMINI_API_KEY="your-key-here"
  pip install google-genai --break-system-packages
  python test_pipeline.py            # live calls to Gemini
  python test_pipeline.py --dry-run  # exercises validation/Turkana logic
                                        without calling the API (no key needed)
"""

import sys
import json
import time

# Force UTF-8 output on Windows — the default cp1252 console can't encode
# Unicode symbols like ✓ or translated text in non-Latin scripts.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from gemini_client import process_alert, AlertProcessingError
from turkana_templates import get_turkana_message
from prompt_builder import SUPPORTED_AI_DIALECTS

# Free tier allows 5 requests/minute on gemini-2.5-flash. Pausing between
# calls keeps us under that instead of racing through the whole test file
# and getting throttled partway through.
SECONDS_BETWEEN_CALLS = 15

TEST_ALERTS = [
    {
        "raw_alert": (
            "Heavy convective precipitation exceeding 180 mm is expected across the "
            "Turkana Basin within the next 24 hours. Significant flash flooding is probable."
        ),
        "severity_level": "Critical",
        "dialects_to_test": ["Somali", "Turkana"],
    },
    {
        "raw_alert": (
            "Below-average cumulative rainfall (less than 40% of the long-term mean) has "
            "been recorded across Marsabit County over the past two rainfall seasons, "
            "indicating high probability of severe pasture and water scarcity."
        ),
        "severity_level": "High",
        "dialects_to_test": ["Oromo", "Amharic"],
    },
    {
        "raw_alert": (
            "Locust swarm activity has been detected moving northwest from the Rift Valley "
            "corridor, with potential to reach cultivated land within 5-7 days."
        ),
        "severity_level": "High",
        "dialects_to_test": ["Swahili", "Turkana"],
    },
]


def run_live():
    print("Running LIVE calls against Gemini API...\n" + "=" * 60)
    first_call = True
    for case in TEST_ALERTS:
        for dialect in case["dialects_to_test"]:
            if not first_call:
                print(f"\n(pausing {SECONDS_BETWEEN_CALLS}s to stay under free-tier rate limit...)")
                time.sleep(SECONDS_BETWEEN_CALLS)
            first_call = False

            print(f"\nALERT: {case['raw_alert'][:70]}...")
            print(f"DIALECT: {dialect}")
            try:
                if dialect in SUPPORTED_AI_DIALECTS:
                    result = process_alert(
                        case["raw_alert"], dialect, case["severity_level"]
                    )
                    warnings = result.pop("_validation_warnings", [])
                    print(json.dumps(result, indent=2, ensure_ascii=False))
                    if warnings:
                        print(f"  ⚠ VALIDATION WARNINGS: {warnings}")
                    else:
                        print("  ✓ Passed validation")
                else:
                    # Turkana path: extract via Gemini, then template-match
                    extraction = process_alert(case["raw_alert"], "Somali", case["severity_level"])
                    turkana_result = get_turkana_message(
                        extraction["hazard_type"], extraction["urgency"], extraction["simplified_en"]
                    )
                    print(json.dumps(turkana_result, indent=2, ensure_ascii=False))
                    if turkana_result["needs_human_review"]:
                        print("  ⚠ NEEDS HUMAN REVIEW before sending (unverified/missing template)")
            except AlertProcessingError as e:
                print(f"  ✗ ERROR: {e}")


def run_dry():
    """
    Exercises the parts of the pipeline that don't need a live API key:
    - Turkana template lookup logic
    - Response validation logic against hand-written mock responses
    Useful for sanity-checking the code before you have a Gemini key.
    """
    print("DRY RUN (no API calls) — testing validation + Turkana fallback logic\n" + "=" * 60)

    # 1. Turkana template path
    print("\n[Turkana template lookup]")
    result = get_turkana_message("Flood", "Critical", "Heavy rain expected, move to high ground.")
    print(json.dumps(result, indent=2, ensure_ascii=False))
    assert result["needs_human_review"] is True, "Unverified template should flag for review"
    print("✓ Correctly flags unverified template for human review")

    # 2. Turkana no-match fallback
    print("\n[Turkana no-template fallback]")
    result = get_turkana_message("Extreme Heat", "Moderate", "Very hot weather expected.")
    print(json.dumps(result, indent=2, ensure_ascii=False))
    assert result["translation_confidence"] == 0.0
    print("✓ Correctly falls back to English + human review when no template exists")

    # 3. Validation logic against a mock well-formed response
    print("\n[Validation: well-formed mock response]")
    from gemini_client import _validate_response
    good_mock = {
        "hazard_type": "Flood",
        "urgency": "Critical",
        "recommended_action": "Move to higher ground now.",
        "simplified_en": "Heavy rain warning. Move to higher ground now.",
        "translated_text": "...",
        "target_dialect": "Somali",
        "translation_confidence": 0.85,
    }
    problems = _validate_response(good_mock)
    print(f"Validation problems: {problems}")
    assert problems == [], "Well-formed mock should pass validation"
    print("✓ Well-formed response passes validation")

    # 4. Validation logic catches an over-length SMS
    print("\n[Validation: oversized simplified_en]")
    bad_mock = dict(good_mock)
    bad_mock["simplified_en"] = "x" * 350
    problems = _validate_response(bad_mock)
    print(f"Validation problems: {problems}")
    assert any("SMS limit" in p for p in problems)
    print("✓ Correctly catches oversized SMS text")

    print("\n" + "=" * 60)
    print("All dry-run checks passed. Add GEMINI_API_KEY and run without ")
    print("--dry-run to test real model output quality.")


if __name__ == "__main__":
    if "--dry-run" in sys.argv:
        run_dry()
    else:
        run_live()