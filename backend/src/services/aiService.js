import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Absolute path to the ai/ directory (backend/src/services → up 3 → Echo-Resilience → ai)
const AI_DIR = path.resolve(__dirname, '../../../', 'ai');

/**
 * Spawns the Python AI bridge as a child process.
 *
 * Communication:
 *   - We write a JSON payload to the process's stdin
 *   - We read the JSON result from its stdout
 *   - Anything the Python code prints (warnings, logs) goes to stderr — kept
 *     separate so it doesn't corrupt the JSON output on stdout
 *
 * @param {object} payload  - JSON-serialisable object to send to api_bridge.py
 * @returns {Promise<object>} - Parsed JSON result from the AI bridge
 */
function callPythonBridge(payload) {
  return new Promise((resolve, reject) => {
    const pythonCmd = process.env.PYTHON_CMD || 'python';

    const proc = spawn(pythonCmd, ['api_bridge.py'], {
      cwd: AI_DIR,
      env: {
        ...process.env, // Pass GEMINI_API_KEY and any other env vars through
        // Windows defaults a piped subprocess's stdout/stderr to the console
        // codepage (cp1252), which can't encode non-Latin scripts like
        // Amharic — force real UTF-8 so translated text doesn't crash on write.
        PYTHONIOENCODING: 'utf-8',
        PYTHONUTF8: '1',
      },
    });

    let stdout = '';
    let stderr = '';

    proc.stdin.write(JSON.stringify(payload));
    proc.stdin.end();

    proc.stdout.on('data', chunk => (stdout += chunk.toString()));
    proc.stderr.on('data', chunk => (stderr += chunk.toString()));

    proc.on('close', code => {
      if (stderr) {
        // Log Python stderr (warnings, rate-limit messages) to our server console
        console.log(`[AI bridge stderr]\n${stderr.trim()}`);
      }
      if (code !== 0) {
        reject(new Error(`AI bridge exited with code ${code}. stderr: ${stderr.trim()}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(new Error(`AI bridge returned invalid JSON. stdout: ${stdout.trim()}`));
      }
    });

    proc.on('error', err =>
      reject(new Error(`Failed to start Python process (cmd: "${pythonCmd}"): ${err.message}`))
    );
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run the simplify → translate → extract pipeline on a raw scientific alert.
 *
 * @param {{ raw_alert: string, target_dialect: string, severity_level?: string }} params
 * @returns {Promise<object>}  — { hazard_type, urgency, recommended_action,
 *                               simplified_en, translated_text, target_dialect,
 *                               translation_confidence, _validation_warnings }
 */
export function processAlert({ raw_alert, target_dialect, severity_level }) {
  return callPythonBridge({
    action:         'process_alert',
    raw_alert,
    target_dialect,
    severity_level: severity_level ?? null,
  });
}

/**
 * Generate a TTS .wav audio file for a processed alert result.
 *
 * @param {{ alert_result: object, alert_id: string }} params
 * @returns {Promise<object>}  — { ...alert_result, audio_path, audio_note }
 */
export function generateAudio({ alert_result, alert_id }) {
  return callPythonBridge({
    action:       'generate_audio',
    alert_result,
    alert_id:     String(alert_id),
  });
}

/**
 * Transcribes audio feedback, translates it to English, and detects hazard type.
 *
 * @param {{ audio_file_path: string, dialect_hint?: string }} params
 * @returns {Promise<object>} — { transcription_text, translated_text, hazard_type }
 */
export function transcribeFeedback({ audio_file_path, dialect_hint }) {
  return callPythonBridge({
    action: 'transcribe_feedback',
    audio_file_path,
    dialect_hint: dialect_hint ?? null,
  });
}

