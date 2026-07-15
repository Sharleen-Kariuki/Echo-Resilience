# Backend IVR Module — Node.js + TypeScript

This module exposes backend APIs for the IVR-related parts of the current EchoResilience database schema.

It works with the current tables:

- `alert_history`
- `feedback_logs`
- `alerts`
- `regions`
- `hazard_types`

It does **not** persist toll-free hotline config because the current database schema does not have an `ivr_config` table.

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
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

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

Later, this is where provider logic such as Africa's Talking, Twilio, or another voice gateway can be added.

## Current schema warnings

There are two schema issues to be aware of:

1. `users.role` has a default of `'viewer'`, but the enum only allows `'superadmin'` and `'admin'`.
2. `alerts.created_by_user_id` is `NOT NULL` but also uses `ON DELETE SET NULL`.

This IVR module avoids touching those areas directly.
