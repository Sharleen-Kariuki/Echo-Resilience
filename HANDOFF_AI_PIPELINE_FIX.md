# EchoResilience — AI Pipeline ("Simplify & Translate") Fix Handoff

Branch: `feature/improved-UI`
Scope: debugging and fixing the "Simplify & Translate" button on the Alerts page, which was silently failing. Nothing in this doc is committed yet.

## 1. Symptom

Clicking "Simplify & Translate" on `Climatealertspage.jsx` appeared to do nothing useful — it showed a mock preview labeled internally as a fallback, with no visible error to the user.

## 2. Wiring trace (confirmed intact, not the problem)

The button *is* correctly wired end-to-end — this was not orphaned/dead code:

1. `src/pages/Climatealertspage.jsx:425` — button calls `handleProcess()` (line 238).
2. `handleProcess` → `api.processAlert(alertId, { regionId, dialect })` (line 243) → `src/lib/api.js:283` → `POST /api/alerts/:id/process` (base URL `http://localhost:5001`).
3. Backend: `backend/src/index.js:50` mounts `/api/alerts`; `backend/src/routes/alerts.js:179` defines `POST /:id/process` (admin-only), which calls `processAlert()` in `backend/src/services/aiService.js:75`.
4. `aiService.js:23-61` (`callPythonBridge`) spawns `python api_bridge.py` as a **child process** from the `AI/` folder, piping JSON over stdin/stdout.
5. `AI/api_bridge.py:50-51` imports and calls `gemini_client.process_alert()`.

**Important UX gap found along the way**: `Climatealertspage.jsx:253-257`'s catch block only does `console.error(error)` and silently swaps in a mock preview — it never surfaces the real failure to the user. This is why the bug looked like "nothing happens" instead of a clear error. *Not fixed in this session* — flagged for a follow-up (see §5).

## 3. Root causes found (both in the Python layer)

### 3a. `google-generativeai` package not installed
The Python environment the Node backend spawns (`python` on PATH, Python 3.13.7) didn't have the package `AI/gemini_client.py` imports. Every call to `api_bridge.py` failed at import time with `ModuleNotFoundError`, causing `aiService.js` to reject with a non-zero exit code.

**Fix**: ran `pip install -r AI/requirements.txt` in that environment. Confirmed `import google.generativeai` and `from gemini_client import process_alert` now succeed (only a `FutureWarning` that Google has sunset this SDK in favor of `google-genai` — non-blocking, noted for future migration).

### 3b. Hardcoded model `gemini-2.5-flash` no longer available to this API key
Even with the package installed, calls failed with:
```
NotFound 404 This model models/gemini-2.5-flash is no longer available to new users.
```
The model still shows up in `genai.list_models()` for this key, but `generate_content` rejects it — Google has restricted it per-project/per-key even though the catalog listing doesn't reflect that. Tested alternatives directly against the same key in `backend/.env`:

| Model | Result |
|---|---|
| `gemini-2.5-flash` | 404 — not available to this key |
| `gemini-2.5-flash-lite` | 404 — not available to this key |
| `gemini-2.0-flash` | 429 — quota/billing exceeded |
| `gemini-flash-latest` | **Success** |

**Fix**: changed the hardcoded default model in `AI/gemini_client.py` from `"gemini-2.5-flash"` to `"gemini-flash-latest"` in two places:
- `call_gemini()` signature default, line 71 (used by `process_alert`)
- `transcribe_feedback()`'s `GenerativeModel(model_name=...)` call, line 185

Used the `-latest` alias rather than pinning to another dated snapshot, since the dated snapshot (`gemini-2.5-flash`) is exactly what broke here — the alias should keep resolving to a supported model as Google rotates versions.

**Not touched, checked and already fine**:
- `AI/stt_client.py:60` already defaults to `gemini-3.5-flash` (current, working).
- `AI/tts_client.py:44` uses `gemini-2.5-flash-preview-tts`, which is a distinct model still present and not part of the "simplify & translate" path — left as-is since it wasn't reported broken and is out of scope.

### 3c. Minor: stray leading space in `.env`
`backend/.env:18` had `GEMINI_API_KEY= AQ.Ab8R...` (space after `=`). The key still authenticated correctly when tested, but removed the space for cleanliness/consistency since it's a latent risk depending on how the env loader trims values.

## 4. Verification

Ran `AI/gemini_client.py`'s `process_alert()` directly (bypassing the Node layer) with a sample flood alert, target dialect Swahili:

```json
{
  "hazard_type": "Flood",
  "urgency": "High",
  "recommended_action": "Move your family and livestock to higher ground immediately.",
  "simplified_en": "Move your family and animals to higher ground immediately. Very heavy rain is coming to Turkana County over the next two days, bringing a high risk of flash floods. Avoid crossing rivers.",
  "translated_text": "Hamisha familia yako na mifugo kwenda sehemu za juu mara moja. Mvua kubwa sana inatarajiwa Kaunti ya Turkana katika siku mbili zijazo, ikileta hatari kubwa ya mafuriko ya ghafla. Jiepushe na kuvuka mito.",
  "target_dialect": "Swahili",
  "translation_confidence": 0.95,
  "_validation_warnings": []
}
```

Clean output, no validation warnings. Did **not** yet re-test through the full Node backend + frontend click path in this session — worth doing before considering this fully closed (see §5).

## 5. Follow-ups / known gaps

- ~~**Verify through the actual UI**~~ — done in Session 2 (§7); this surfaced the real remaining bug (§7a).
- ~~**Frontend error handling**~~ — done in Session 2 (§7a, §7f); real backend errors now surface as inline banners instead of a silent mock fallback.
- **SDK deprecation**: `google-generativeai` is fully sunset upstream; `AI/gemini_client.py`, `stt_client.py`, and `tts_client.py` should eventually migrate to the `google-genai` package. Not urgent — old SDK still functions — but will eventually stop receiving fixes. *Still open.*
- **`gemini-2.0-flash` quota/billing**: hit a 429 resource-exhausted error on this key when testing — if that model is ever chosen deliberately elsewhere in the codebase, check the Google Cloud billing/quota tied to this key. *Still open — see also §8 on rate limits.*
- **Python environment**: confirm the `python` on PATH used by the deployed/production backend (not just this local dev machine) also has `AI/requirements.txt` installed — this was a local-only fix. *Still open.*

## 6. Files changed this session

- `AI/gemini_client.py` — model name fix (2 locations)
- `backend/.env` — removed stray space in `GEMINI_API_KEY`
- Python environment — installed `google-generativeai` (not a repo file change, but required for this fix to take effect on this machine)

---

## 7. Session 2 (2026-07-22) — response-shape bug, Windows encoding, audio path, and UX follow-through

Session 1 fixed the Python/Gemini layer in isolation but was never re-tested through the actual UI (flagged in §5). Doing that surfaced a second, unrelated bug that was the *actual* reason the button kept failing for the user, plus two more environment bugs found while chasing "I can't play the audio" and a batch of UX requests. Scope grew from "fix the bug" to "make the whole simplify → translate → audio → dispatch flow usable."

### 7a. Real root cause of "Simplify & Translate failed": frontend response-shape mismatch

`POST /api/alerts/:id/process` and `/dispatch` return `{ historyRecord, aiResult }` (see `backend/src/routes/alerts.js`). But `getResultText()` in `src/pages/Climatealertspage.jsx` only checked the top level of the response and `response.data` — it never looked inside `historyRecord` or `aiResult`. So even a fully successful AI call (Session 1's fix working correctly) still hit `Climatealertspage.jsx`'s `"API response did not include simplified or translated text."` error, because the text was there, just one level deeper than the code looked.

**Fix**: `getResultText`/`getResultValue` now check `payload`, `payload.data`, `payload.historyRecord`, `payload.aiResult`, and `payload.audioResult`, in that order.

### 7b. Windows `UnicodeEncodeError` on non-Latin scripts (Amharic)

Amharic (Ethiopic script) translations crashed `AI/api_bridge.py` when writing the JSON result to stdout:
```
UnicodeEncodeError: 'charmap' codec can't encode characters in position ...
```
Windows defaults a piped/redirected subprocess's stdout to the console codepage (cp1252), which can't represent Ethiopic characters. Somali/Oromo/Swahili (Latin script) never hit this, which is why it looked dialect-specific.

**Fix** (`backend/src/services/aiService.js`, `callPythonBridge`): pass `PYTHONIOENCODING: 'utf-8'` and `PYTHONUTF8: '1'` in the spawned process's `env`.

**Important**: this only takes effect once the Node backend process is restarted (`npm run dev` uses `node --watch`, which *should* pick up the change automatically on save — but if it doesn't, or the server is running via `npm start` with no watcher, restart manually and confirm the fix before assuming it's still broken).

### 7c. Audio playback silently failing — static file path pointed outside the project

`backend/src/index.js` served generated audio from:
```js
const GENERATED_AUDIO_DIR = path.resolve(__dirname, '../../../ai/generated_audio');
```
`__dirname` there is `backend/src` — three `..` from there lands one directory *above* the project root entirely (e.g. `Documents/ai/generated_audio`, outside `ICPAC_FRONTEND`), not `ICPAC_FRONTEND/ai/generated_audio` where `AI/tts_client.py` actually writes `.wav` files. Every `/audio/*` request 404'd, so nothing ever played, with no error surfaced in the UI at the time.

**Fix**: changed to `path.resolve(__dirname, '../../ai/generated_audio')` (two `..`, matching `backend/src` → `backend` → project root).

### 7d. Preview panel: dynamic dialects, live language switching, unverified-translation handling

- Dialect pills now come from `GET /api/dialects` (`api.getDialects()`) instead of a hardcoded `SUPPORTED_DIALECTS` array, so the UI always reflects what the backend advertises.
- Clicking a dialect pill immediately re-runs simplify/translate (and, if verified, audio generation) for that language instead of just changing a dropdown value for the next manual button press.
- Turkana is handled by `AI/turkana_templates.py`'s phrase-bank lookup, not Gemini, and every entry in `TURKANA_PHRASE_BANK` is currently `verified: False` — so it always returns `needs_human_review: true` with placeholder text, and the backend intentionally skips TTS for it (`AI/tts_client.py`'s `generate_audio_for_alert`). The frontend now reads `needs_human_review` from the AI result and shows a red "UNVERIFIED — NEEDS HUMAN REVIEW" badge, and swaps the "GENERATE AUDIO" button for an explanatory note instead of a button that would just fail.
- `handleAudio` now checks the response for an actual `audio_path` (via `getResultValue`) before pointing the `<audio>` element at a URL — previously it always set the URL, so a failed/unsupported-dialect generation left a silently broken player. Failures now show an inline error instead.
- Added `autoPlay` to the `<audio controls>` element so generated audio starts playing as soon as it's ready.
- Added a prominent "Switching from X to Y — translating..." spinner banner in the Preview card (previously the only feedback was a small gray status line easy to miss), and the stale preview text now dims to 40% opacity while a new language is loading.
- Added simulated percentage progress bars (`useSimulatedProgress` hook — there's no real progress API for a single Gemini call, so it eases toward ~92% while waiting and jumps to 100% on completion) under "Simplify & Translate", under the audio player, and above the "Send to Community" button.
- Gemini rate-limit errors (`RESOURCE_EXHAUSTED` / 429, surfaced via the Python retry-backoff in `gemini_client.py`) now get translated into a plain-English message via a `friendlyError()` helper instead of showing the raw Python traceback.

### 7e. Region selection no longer defaulted

`Climatealertspage.jsx` used to auto-select the first region on load (`setRegionIds([regions[0].id])`) and `selectedRegionId` fell back to `allRegions[0]?.id` even with nothing chosen. Per explicit request, both defaults were removed — the admin must now explicitly add a region via "Add Region" before any AI/dispatch action is enabled. Added a hint line above the footer buttons listing exactly what's missing (description / hazard type / region) instead of leaving them disabled with no explanation.

### 7f. "Send to Community" — success confirmation and redirect

Previously `handleDispatch` assumed success from the absence of a thrown error and gave no visible confirmation, so there was no way to tell if it had worked. Now it:
1. Checks the backend's own `historyRecord.status === 'dispatched'` before treating the call as successful.
2. On success, briefly shows the dispatch progress bar at 100% ("Sent! Redirecting..."), then navigates to `/alerts` (Alert History) carrying dispatch details via router `state`.
3. `AlertHistoryPage.jsx` reads that state and shows a dismissible green confirmation banner ("X dispatched in [language] to N registered numbers in [region]"), then immediately clears the navigation state so a page refresh doesn't re-show a stale banner.
4. On failure, stays on the alert-creation page and shows a `dispatchError` banner with the real error instead of a small status line.

## 8. Known remaining gaps (as of Session 2)

- **Turkana has no verified translations yet** — `AI/turkana_templates.py`'s `TURKANA_PHRASE_BANK` entries are all placeholders (`verified: False`). Until a Turkana speaker signs off on real translations, Turkana will always show the unverified badge and never get audio. This is by design (see the module docstring), not a bug.
- **Rate-limit pressure from auto-audio-generation**: auto-running audio generation after every language switch roughly doubles Gemini API calls per switch (1 for translate, 1 for audio), which burns through the free-tier quota faster when switching languages rapidly. Not fixed — flagged as a tradeoff of the auto-refresh feature explicitly requested.
- **`google-generativeai` SDK deprecation** — carried over from Session 1, still open.
- **Backend restart discipline** — confirm whichever process manager runs this in production restarts cleanly after deploys; local dev relies on `node --watch` picking up changes, which isn't guaranteed in all environments.

## 9. Files changed this session (Session 2)

- `src/pages/Climatealertspage.jsx` — response-shape parsing fix (§7a), dynamic dialect list, pill-click auto-translate, `needs_human_review` badge/audio-gating, `handleAudio` validation + autoplay, region-preset removal, dispatch status check + redirect, simulated progress bars, friendlier error messages
- `src/pages/AlertHistoryPage.jsx` — dispatch success banner read from router state
- `backend/src/services/aiService.js` — `PYTHONIOENCODING`/`PYTHONUTF8` env vars for the spawned Python process (§7b)
- `backend/src/index.js` — fixed `GENERATED_AUDIO_DIR` path resolution (§7c)
