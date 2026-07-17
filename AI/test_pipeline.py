"""
test_pipeline.py

Tests the outbound alert pipeline: simplify -> translate -> extract.

Usage:
  python test_pipeline.py --dry-run   # no API key needed, tests validation logic
  python test_pipeline.py             # live calls to Gemini
"""

import sys
import json
import time

from gemini_client import process_alert, AlertProcessingError, _validate
from prompt_builder import SUPPORTED_DIALECTS

TEST_ALERTS = [
    {
        "raw_alert": (
            "Heavy convective precipitation exceeding 180 mm is expected within the "
            "next 24 hours. Significant flash flooding is probable."
        ),
        "severity_level": "Critical",
        "dialects_to_test": ["Somali", "Amharic"],
    },
    {
        "raw_alert": (
            "Below-average cumulative rainfall (less than 40% of the long-term mean) "
            "has been recorded over the past two rainfall seasons, indicating high "
            "probability of severe pasture and water scarcity."
        ),
        "severity_level": "High",
        "dialects_to_test": ["Somali", "Amharic"],
    },
]

SECONDS_BETWEEN_CALLS = 15


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
                result = process_alert(case["raw_alert"], dialect, case["severity_level"])
                warnings = result.pop("_validation_warnings", [])
                print(json.dumps(result, indent=2, ensure_ascii=False))
                print("  ✓ Passed validation" if not warnings else f"  ⚠ {warnings}")
            except AlertProcessingError as e:
                print(f"  ✗ ERROR: {e}")


def run_dry():
    print("DRY RUN (no API calls)\n" + "=" * 60)
    good = {
        "hazard_type": "Flood", "urgency": "Critical",
        "recommended_action": "Move to higher ground now.",
        "simplified_en": "Heavy rain warning. Move to higher ground now.",
        "translated_text": "...", "target_dialect": "Somali",
        "translation_confidence": 0.85,
    }
    assert _validate(good) == []
    print("✓ Well-formed response passes validation")

    bad = dict(good)
    bad["simplified_en"] = "x" * 350
    problems = _validate(bad)
    assert any("SMS limit" in p for p in problems)
    print("✓ Correctly catches oversized SMS text")

    print(f"\nSupported dialects: {SUPPORTED_DIALECTS}")
    print("\nAll dry-run checks passed. Run without --dry-run to test real output.")


if __name__ == "__main__":
    run_dry() if "--dry-run" in sys.argv else run_live()