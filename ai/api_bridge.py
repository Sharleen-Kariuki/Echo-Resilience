"""
api_bridge.py

Stdin/stdout JSON bridge between the Node.js Express backend and the Python AI pipeline.
Called as a subprocess by backend/src/services/aiService.js.

Protocol:
  - Input:  JSON object read from stdin
  - Output: JSON object written to stdout (and ONLY to stdout)
  - Logs/warnings: written to stderr so they don't corrupt the stdout JSON

Input schema:
  { "action": "process_alert", "raw_alert": "...", "target_dialect": "Somali", "severity_level": "High" }
  { "action": "generate_audio", "alert_result": {...}, "alert_id": "42_7" }

Output schema:
  Same dict returned by gemini_client.process_alert() or tts_client.generate_audio_for_alert()
  On error: { "error": "message" } — exit code 1
"""

import sys
import json

# ─── Redirect stdout to stderr BEFORE importing AI modules ───────────────────
# The AI modules use print() for rate-limit warnings, progress messages, etc.
# We redirect stdout → stderr during processing so those prints don't corrupt
# the JSON we write at the very end. We restore stdout just before the final write.
_real_stdout = sys.stdout
sys.stdout = sys.stderr


def main():
    try:
        raw_input = _real_stdout.fileno  # noqa — just a check stdout is still real
    except Exception:
        pass

    try:
        data = json.loads(sys.stdin.read())
    except json.JSONDecodeError as e:
        sys.stdout = _real_stdout
        _real_stdout.write(json.dumps({"error": f"Invalid JSON input: {e}"}))
        _real_stdout.flush()
        sys.exit(1)

    action = data.get("action")
    result = None

    try:
        if action == "process_alert":
            from gemini_client import process_alert, AlertProcessingError
            from turkana_templates import get_turkana_message
            from prompt_builder import SUPPORTED_AI_DIALECTS

            raw_alert      = data["raw_alert"]
            target_dialect = data["target_dialect"]
            severity_level = data.get("severity_level")

            if target_dialect in SUPPORTED_AI_DIALECTS:
                result = process_alert(raw_alert, target_dialect, severity_level)
            else:
                # Turkana path: use Gemini for extraction, then template lookup
                extraction = process_alert(raw_alert, "Somali", severity_level)
                turkana    = get_turkana_message(
                    extraction["hazard_type"],
                    extraction["urgency"],
                    extraction["simplified_en"],
                )
                # Merge: Turkana fields override the Somali translation fields
                result = {**extraction, **turkana}

        elif action == "generate_audio":
            from tts_client import generate_audio_for_alert

            alert_result = data["alert_result"]
            alert_id     = str(data["alert_id"])
            result       = generate_audio_for_alert(alert_result, alert_id)

        elif action == "transcribe_feedback":
            from gemini_client import transcribe_feedback

            audio_file_path = data["audio_file_path"]
            dialect_hint    = data.get("dialect_hint")
            result          = transcribe_feedback(audio_file_path, dialect_hint)

        else:
            sys.stdout = _real_stdout
            _real_stdout.write(json.dumps({"error": f"Unknown action: '{action}'"}))
            _real_stdout.flush()
            sys.exit(1)

    except KeyError as e:
        sys.stdout = _real_stdout
        _real_stdout.write(json.dumps({"error": f"Missing required field: {e}"}))
        _real_stdout.flush()
        sys.exit(1)

    except Exception as e:
        sys.stdout = _real_stdout
        _real_stdout.write(json.dumps({"error": str(e)}))
        _real_stdout.flush()
        sys.exit(1)

    # ── Success: restore stdout and write the JSON result ──
    sys.stdout = _real_stdout
    _real_stdout.write(json.dumps(result, ensure_ascii=False))
    _real_stdout.flush()


if __name__ == "__main__":
    main()
