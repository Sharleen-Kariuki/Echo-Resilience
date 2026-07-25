# Backend IVR Module — Node.js + TypeScript

This module exposes backend APIs for the IVR-related parts of the current EchoResilience database schema.

It works with the current tables:

- `alert_history`
- `feedback_logs`
- `alerts`
- `regions`
- `hazard_types`

It also now owns three more tables added specifically for broadcast:

- `community_members` — the actual phone-number roster (individual registered recipients). `communities`/`regions` never stored a phone number themselves; this is what closes that gap.
- `call_attempts` — one row per (alert_history, recipient) dispatch attempt, voice or SMS, tracked individually.
- `ivr_config` — which provider/hotline number is active (no API keys — those stay in `.env`, see below).

**Target channel is voice, via Twilio**, with **SMS as fallback only**, via Africa's Talking (used automatically when no active `ivr_config` row has a `voicePhoneNumber` set — e.g. before you have a Twilio number provisioned, or if you deliberately keep voice off). The AI pipeline's dialect warning (`alert_history.translated_text` / `.simplified_text`, produced by `POST /api/alerts/:id/dispatch` in the main `backend/`) is what gets played (voice, via a pre-generated audio file) or texted (SMS fallback) to every matching `community_member`.

**Why Twilio for voice, Africa's Talking for SMS:** Africa's Talking Voice requires a live (non-sandbox) app with legal-ownership documents reviewed and approved before you can use it at all — a multi-day process outside this project's control. Twilio's trial tier instead only requires **verifying individual destination numbers** (an automated OTP confirmation, a couple of minutes each, no business documents), which is realistic to clear same-day. Africa's Talking SMS sandbox has no such gate and is proven working, so it stays as the fallback channel.

**Known limitation (intentional for the hackathon demo):** one `alert_history` row has exactly one dialect and one pre-generated audio file, and a broadcast plays/texts that same one to every member matched by region/community — even though each `CommunityMember` has its own `language`/`dialect` field on file. There is no per-recipient audio selection yet. **Future improvement (production):** group matched members by their own `dialect`, ensure one AI-generated `alert_history`/audio exists per `(alert, region, dialect)` combination, and dispatch each group against its own matching audio, so each person hears their own dialect instead of whichever one the admin picked for the whole region. Not implemented now because it also requires deciding how/when the AI pipeline (which lives in `backend/`, not this module) gets triggered for a dialect that hasn't been generated yet — demo priority is one solid, working voice broadcast.

**On the Africa's Talking SMS sandbox specifically:**

- We are using the Africa's Talking **sandbox** app, not a live app. Sandbox SMS is delivered to the [Africa's Talking simulator](https://developers.africastalking.com/docs/sandbox/overview) inside your account dashboard — **it never reaches a real handset**, regardless of what number you send to.
- `phoneNumbers` in the request body are required by the API shape (Africa's Talking's `SMS.send` call always needs a `to` list) but in sandbox mode they are simulated recipients only — they do not need to belong to real community members, and nothing is actually delivered to them.
- The endpoint is intentionally **production-shaped**: the request/response contract (`phoneNumbers` in, per-recipient success/failure out, `alert_history` status/`calls_count` updated) does not change when you later switch to a live Africa's Talking app. What changes at that point is (a) live app credentials + an airtime/SMS top-up, and (b) a real recipient/phone-number table to source `phoneNumbers` from instead of a manual list — neither of which exists yet, by design, for this hackathon build.

**On Twilio for voice specifically:**

- Twilio has essentially **no local Kenyan Voice-capable number inventory** for self-service purchase. Buy a US or UK number instead — it can still place calls to `+254` numbers — and make sure **Voice → Settings → Geo Permissions** has Kenya enabled for outbound calls (Twilio disables most international destinations by default on new accounts).
- On a **trial** account, you can only call phone numbers you've verified (Twilio console → Voice or Messaging → **Verified Caller IDs**) — an automated OTP check per number, no business KYC.
- Twilio's callback URL is passed **per call** (in the `calls.create()` request), unlike Africa's Talking where it's a fixed setting on the number — so this module embeds the `call_attempts` row id as a `?callAttemptId=` query param on the callback URLs it hands Twilio, rather than relying on a field being echoed back.

## Install

```bash
npm install
```

## Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/echoresilience
PORT=5002
CORS_ORIGIN=http://localhost:3000

# SMS (fallback) — Africa's Talking
SMS_PROVIDER=mock          # or "africastalking"
AT_USERNAME=sandbox
AT_API_KEY=your-africastalking-sandbox-api-key
AT_SENDER_ID=

# Voice (target channel) — Twilio
VOICE_PROVIDER=mock       # or "twilio"
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
VOICE_CALLBACK_BASE_URL=http://localhost:5002   # a public ngrok URL for real calls
```

With both providers set to `mock`, nothing calls a real API — messages/calls are just logged, and the alert → warning → dispatch → status-update flow is fully demoable with zero external dependencies. Switch `SMS_PROVIDER=africastalking` once you have a sandbox API key, and `VOICE_PROVIDER=twilio` once you have Twilio credentials, a Voice-capable number, and (for a real call) a public tunnel for `VOICE_CALLBACK_BASE_URL`. SMS and voice are independent — you can run one on `mock` and the other on the real provider.

## Run

```bash
npm run dev
```

## Endpoints

### Get IVR dispatch history

```http
GET /api/ivr/history
```

### Get one IVR history item

```http
GET /api/ivr/history/:id
```

### Get IVR feedback logs

```http
GET /api/ivr/feedback
```

### Get one IVR feedback log

```http
GET /api/ivr/feedback/:id
```

### Update IVR dispatch status

```http
PATCH /api/ivr/history/:id/status
```

Body:

```json
{
  "status": "dispatched",
  "callsCount": 25
}
```

Allowed statuses:

- `pending`
- `dispatched`
- `failed`

### Retry IVR dispatch

```http
POST /api/ivr/history/:id/retry
```

MVP behavior:

- Does not call a real telephony provider yet.
- Sets the selected history record back to `pending`.
- Increments `calls_count` by 1.

### Dispatch SMS for an alert history record

```http
POST /api/ivr/history/:id/dispatch-sms
```

Body:

```json
{
  "phoneNumbers": ["+254700000001", "+254700000002"]
}
```

There's no recipient/phone-number table yet, so `phoneNumbers` must be provided explicitly by the caller — this endpoint does not (and cannot) resolve "everyone registered in this region" on its own.

Behavior:

1. Loads the `alert_history` row (`:id`) and builds the message from `translated_text` (falling back to `simplified_text`, then the raw alert text if neither AI field is populated yet).
2. Sends that message to each number in `phoneNumbers` via the configured `SMS_PROVIDER` (`mock` or `africastalking`).
3. Sets `status` to `dispatched` if at least one send succeeded, otherwise `failed`; increments `calls_count` by the number of successful sends.

Response:

```json
{
  "message": "SMS dispatch complete",
  "provider": "africastalking",
  "smsMessage": "EchoResilience Alert (Flood, Critical): ...",
  "recipients": ["+254700000001"],
  "successCount": 1,
  "failureCount": 0,
  "data": { "...": "updated alert_history row" },
  "results": [
    { "to": "+254700000001", "success": true, "status": "Success", "providerMessageId": "ATXid_..." }
  ]
}
```

Provider selection is controlled by `SMS_PROVIDER`:

- `mock` (default) — logs the message, never calls a real API, always succeeds. Safe for rehearsal and for demoing the full status-update flow without credentials.
- `africastalking` — sends via the Africa's Talking SMS API (`src/services/sms/africasTalkingSmsProvider.ts`), using `AT_USERNAME`/`AT_API_KEY`/`AT_SENDER_ID`.

### Broadcast an alert to a region (voice, falls back to SMS)

```http
POST /api/ivr/history/:id/broadcast
```

Body (both optional):

```json
{
  "regionId": 1,
  "communityId": 2
}
```

`regionId` defaults to the `alert_history` row's own region if omitted; `communityId` further narrows to one community within that region.

Behavior:

1. Loads the `alert_history` row and builds the warning message the same way SMS dispatch does (`translated_text` → `simplified_text` → raw alert).
2. Looks up the active `ivr_config` row. If it has a `voicePhoneNumber`, the channel is **voice**; otherwise it falls back to **SMS**.
3. Finds every active, consenting `CommunityMember` in scope (`regionId`/`communityId`).
4. Creates one `call_attempts` row per recipient, dispatches each (voice call or SMS), and updates that row's `status` individually — `queued` for a voice call that was successfully placed (its real outcome arrives later via the voice callback below), `completed`/`failed` immediately for SMS (synchronous).
5. Rolls the outcome up into `alert_history.status`: `dispatched` (all succeeded), `failed` (all failed), or `partial` (mixed). `calls_count` increments by the number of successful dispatches.

Response:

```json
{
  "message": "Broadcast dispatch complete",
  "warningMessage": "EchoResilience Alert (Flood, Critical): ...",
  "alertHistoryId": 1,
  "channelUsed": "voice",
  "provider": "twilio",
  "totalRecipients": 3,
  "successCount": 3,
  "failureCount": 0,
  "alertHistoryStatus": "dispatched",
  "recipients": [
    { "callAttemptId": 12, "memberId": 5, "phoneNumber": "+254700000001", "channel": "voice", "success": true, "status": "queued", "providerRef": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
  ]
}
```

If no matching members are found, this responds `200` with `totalRecipients: 0` and an explanatory `message` — `alert_history` is left untouched (no attempt was made), rather than fabricating success.

### Voice callback (Twilio hits these, not you)

```http
POST /api/ivr/voice-callback
POST /api/ivr/voice-status-callback
```

These are **not** something you call manually — they're the URLs this module hands Twilio per call (in the `calls.create()` request — see `src/services/providers/twilioCallProvider.ts`), each carrying `?callAttemptId=<id>` so the handler knows which `call_attempts` row and message it's for. Unlike Africa's Talking (a fixed callback URL configured once on the number), Twilio takes these fresh on every call, so no dashboard configuration is needed for this part.

1. **`voice-callback`** — hit once the call is answered, expecting TwiML back. Looks up the `call_attempts` row from `callAttemptId`, marks it `in_progress`, and responds with `<Play>` (pointing at the linked `alert_history`'s pre-generated audio file — preferred, see `AI/README.md`'s warning about not trusting a telephony provider's built-in TTS for Somali/Oromo/Turkana) or `<Say>` as a last-resort fallback if no audio exists yet.
2. **`voice-status-callback`** — hit at call-state transitions (`initiated`/`ringing`/`answered`/`completed`, per `statusCallbackEvent` in `twilioCallProvider.ts`). Only terminal states (`completed`/`busy`/`failed`/`no-answer`/`canceled`) update the row — this is its authoritative final outcome, stamping `completed_at`.

**Both require a publicly reachable `VOICE_CALLBACK_BASE_URL`.** Twilio's servers cannot reach `localhost`. For local development/demo, tunnel this module with `ngrok http 5002` and set `VOICE_CALLBACK_BASE_URL` to the printed `https://<subdomain>.ngrok.io` URL. The same applies to `MAIN_API_BASE_URL` (below) if you want the `<Play>` audio URL to actually resolve during a live call.

## Testing the SMS dispatch flow

You need an existing `alert_history` row id first — seed data creates several (`database/prisma/seed.js`), or create one via the main backend's `POST /api/alerts/:id/dispatch`. The examples below use id `1`.

### 1. Mock provider (no credentials needed)

```bash
# .env: SMS_PROVIDER=mock
npm run dev
```

```bash
curl -X POST http://localhost:5002/api/ivr/history/1/dispatch-sms \
  -H "Content-Type: application/json" \
  -d '{"phoneNumbers": ["+254700000001", "+254700000002"]}'
```

Expected: HTTP 200, `"provider": "mock"`, both recipients `"success": true`, `data.status` is `"dispatched"`, `data.callsCount` incremented by 2. Check the server console for `[mock-sms] → +254700000001: ...` log lines — that's the "SMS" for this provider.

### 2. Africa's Talking sandbox provider

1. Create/sign in to an Africa's Talking account at https://account.africastalking.com/ and open (or create) the **Sandbox** app — no card or payment needed.
2. Grab the sandbox API key from the app's dashboard.
3. Set in `.env`:
   ```env
   SMS_PROVIDER=africastalking
   AT_USERNAME=sandbox
   AT_API_KEY=<your-sandbox-api-key>
   AT_SENDER_ID=
   ```
4. Restart the module (`npm run dev`) so the new env vars load.
5. Send the same request:
   ```bash
   curl -X POST http://localhost:5002/api/ivr/history/1/dispatch-sms \
     -H "Content-Type: application/json" \
     -d '{"phoneNumbers": ["+254700000001"]}'
   ```
6. Expected: HTTP 200, `"provider": "africastalking"`, a real Africa's Talking `providerMessageId` (looks like `ATXid_...`) in `results[0]`. Open your Africa's Talking dashboard → **Sandbox → Simulator** to see the message actually "arrive" there — it will not arrive on any physical phone, by design of the sandbox.

### Postman equivalent

- Method: `POST`
- URL: `http://localhost:5002/api/ivr/history/1/dispatch-sms`
- Headers: `Content-Type: application/json`
- Body (raw, JSON): `{"phoneNumbers": ["+254700000001"]}`

Swap the `1` for any real `alert_history` id, and toggle `SMS_PROVIDER` in `.env` between requests to compare mock vs. sandbox behavior without touching code.

## Testing the voice broadcast flow

### 1. Mock provider (no credentials needed)

```env
VOICE_PROVIDER=mock
```

```bash
curl -X POST http://localhost:5002/api/ivr/history/1/broadcast -H "Content-Type: application/json" -d '{}'
```

Expected: `"channelUsed"` is `"sms"` unless an `ivr_config` row has a `voicePhoneNumber` set (with no config row seeded, or `voicePhoneNumber: null`, it correctly falls back to SMS — see the "known limitation" note above about `VOICE_PROVIDER=mock` still requiring a configured `voicePhoneNumber` to actually route through the voice branch). To force the voice branch for a mock test, give the seeded `ivr_config` row a placeholder `voicePhoneNumber` (e.g. via `npx prisma studio` from `database/`) — you'll then see `[mock-voice] → ...` log lines and `call_attempts` rows moving through `queued`.

### 2. Twilio (real live call)

1. Sign up at https://console.twilio.com/ (instant, no review) — note your **Account SID** and **Auth Token** from the dashboard.
2. Buy a Voice-capable number under a country Twilio actually stocks (US/UK — Kenya has essentially no self-service Voice inventory). Enable **Kenya** under Voice → Settings → Geo Permissions if calling `+254` numbers.
3. Verify the destination number(s) you'll actually call: Voice or Messaging → **Verified Caller IDs** → add number → confirm the OTP. No documents needed — this is what makes Twilio usable same-day, unlike Africa's Talking Voice.
4. Tunnel this module publicly: `ngrok http 5002`, copy the `https://...ngrok.io` URL.
5. Set in `.env`:
   ```env
   VOICE_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token
   VOICE_CALLBACK_BASE_URL=https://<your-ngrok-subdomain>.ngrok.io
   ```
6. Set a real `voicePhoneNumber` (your purchased Twilio number, e.g. `+1XXXXXXXXXX`) on the active `ivr_config` row — no admin UI for this yet, use `npx prisma studio` from `database/` or a direct SQL update.
7. Restart (`npm run dev`), then broadcast against an `alert_history` row whose region includes your verified number as a `CommunityMember`:
   ```bash
   curl -X POST http://localhost:5002/api/ivr/history/1/broadcast -H "Content-Type: application/json" -d '{}'
   ```
8. Expected: the verified phone actually rings. Answering plays the AI-generated audio (or hears the `<Say>` fallback if no audio exists for that dialect yet). `call_attempts` moves `queued` → `in_progress` → `completed` as the two callbacks land — watch the server console (`morgan` logs each hit).

## Current schema warnings

There are two schema issues to be aware of:

1. `users.role` has a default of `'viewer'`, but the enum only allows `'superadmin'` and `'admin'`.
2. `alerts.created_by_user_id` is `NOT NULL` but also uses `ON DELETE SET NULL`.

This IVR module avoids touching those areas directly.
