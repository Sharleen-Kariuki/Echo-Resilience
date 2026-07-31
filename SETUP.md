# Echo Resilience — Complete End-to-End Setup Guide

This document provides a complete guide for setting up, configuring, seeding, and running the **Echo Resilience** platform from scratch on a new machine.

---

## 📋 System Prerequisites

Ensure you have the following installed on your host system:

| Dependency | Minimum Version | Recommended |
|---|---|---|
| **Node.js** | `v18.0.0` | `v22.x` |
| **npm** | `v9.0.0` | `v10.x` |
| **Python** | `3.10` | `3.13` |
| **PostgreSQL** | `14` | `17` |
| **ngrok** | Latest CLI | Latest |

---

## 🔑 Required API Credentials & Accounts

Before configuring environment files, obtain the following keys:

1. **Google Gemini API Key**:
   - Obtain from [Google AI Studio](https://aistudio.google.com/apikey).
   - Powers LLM simplification, multi-dialect translation, TTS voice generation, and STT feedback transcription.

2. **Twilio Voice Account**:
   - Account SID & Auth Token from [Twilio Console](https://console.twilio.com/).
   - A purchased or trial active voice-enabled Twilio phone number (e.g. `+17373795773`).

3. **Africa's Talking (Optional for SMS Sandbox)**:
   - Username (`sandbox`) and API Key from [Africa's Talking Sandbox](https://africastalking.com/).

---

## 📁 Repository Overview

```text
Echo-Resilience/
├── src/                    # Frontend (React 19 + Vite + Leaflet)
├── backend/                # Primary REST API (Express JS, Port 5001)
├── backend_ivr_module/     # IVR & Voice/SMS Dispatch Engine (Express TS, Port 5002)
├── AI/                     # Python AI Pipeline (Gemini LLM, TTS, STT)
└── database/               # Shared PostgreSQL Schema & Seed scripts (Prisma)
```

---

## 🚀 Step-by-Step Installation & Setup

### Step 1: Clone Repository & Install Node Dependencies

Install dependencies across all Node packages:

```bash
# 1. Root Frontend dependencies
npm install

# 2. Main Backend dependencies
cd backend && npm install && cd ..

# 3. IVR Module dependencies
cd backend_ivr_module && npm install && cd ..

# 4. Database package dependencies
cd database && npm install && cd ..
```

---

### Step 2: Configure Environment Files (`.env`)

Create `.env` files in the respective service directories.

#### A. Main Backend Environment (`backend/.env`)
Create `backend/.env`:
```ini
# Database connection
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/echoresilience?schema=public"

# JWT Auth Secret
JWT_SECRET="d1369cfdfd04cb50302b1f81d1983eb0de9744dfd4109405d45d65f573d8c11e"

# Server Port
PORT=5001
NODE_ENV=development

# Allowed Frontend Origins
FRONTEND_URL="http://localhost:5173,http://localhost:3000"

# Python Binary Executable
PYTHON_CMD="python"
```

#### B. IVR Module Environment (`backend_ivr_module/.env`)
Create `backend_ivr_module/.env`:
```ini
PORT=5002
NODE_ENV=development
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/echoresilience?schema=public"
CORS_ORIGIN="http://localhost:5173,http://localhost:3000"

# SMS Configuration
SMS_PROVIDER=africastalking
AT_USERNAME=sandbox
AT_API_KEY=your_africastalking_api_key

# Voice via Twilio
VOICE_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Public Webhook Base URL (Must match your active ngrok URL)
VOICE_CALLBACK_BASE_URL="https://YOUR_NGROK_SUBDOMAIN.ngrok-free.dev"

# Main API Base URL for audio serving
MAIN_API_BASE_URL="https://YOUR_NGROK_SUBDOMAIN.ngrok-free.dev"
```

#### C. AI Pipeline Environment (`AI/.env`)
Create `AI/.env`:
```ini
GEMINI_API_KEY="your_google_gemini_api_key"
```

---

### Step 3: Python AI Pipeline Setup

Install the required Python packages for the AI pipeline:

```bash
cd AI
pip install google-genai
```

Test the AI pipeline standalone:
```bash
python test_pipeline.py
```

---

### Step 4: Database Provisioning & Schema Seeding

1. Start your local PostgreSQL server and create the database `echoresilience`:
```sql
CREATE DATABASE echoresilience;
```

2. Generate Prisma Client and push database schema:
```bash
# Generate client
cd backend && npm run prisma:generate && cd ..

# Push schema to database
cd database
npx prisma db push --schema=./prisma/schema.prisma

# Seed initial regions, hazard types, admin users, and community members
npm run prisma:seed
cd ..
```

3. Register your Twilio phone number and test community members in the database:
```bash
$env:PGPASSWORD='YOUR_PASSWORD'; psql -U postgres -d echoresilience -c "UPDATE ivr_config SET voice_phone_number = '+17373795773', provider = 'twilio', is_active = true WHERE id = 2;"

$env:PGPASSWORD='YOUR_PASSWORD'; psql -U postgres -d echoresilience -c "INSERT INTO community_members (full_name, phone_number, region_id, is_active, consent, created_at, updated_at) VALUES ('Admin Test', '+2547XXXXXXXX', 16, true, true, NOW(), NOW()), ('Admin Test', '+2547XXXXXXXX', 17, true, true, NOW(), NOW()) ON CONFLICT DO NOTHING;"
```

---

### Step 5: Start ngrok Public Tunnel

Twilio requires a public HTTPS URL to issue voice call webhooks and fetch generated TwiML and `.wav` audio files.

Start ngrok tunneling to the IVR module port (`5002`):

```bash
ngrok http 5002
```

Copy the generated HTTPS public URL (e.g., `https://skeptic-rake-contents.ngrok-free.dev`) and ensure it is updated in `backend_ivr_module/.env` under `VOICE_CALLBACK_BASE_URL` and `MAIN_API_BASE_URL`.

---

### Step 6: Start All Services

Open 3 terminal sessions to run each component concurrently:

#### Terminal 1 — Frontend Server (Vite)
```bash
# Runs on http://localhost:5173
npm run dev
```

#### Terminal 2 — Backend REST API
```bash
# Runs on http://localhost:5001
cd backend
npm run dev
```

#### Terminal 3 — IVR & Voice Dispatch Engine
```bash
# Runs on http://localhost:5002
cd backend_ivr_module
npm run dev
```

---

## 🔑 Default Login Credentials

Access the web portal at **[http://localhost:5173](http://localhost:5173)**:

| Email | Role | Password |
|---|---|---|
| `superadmin@echoresilience.org` | `superadmin` | `Passw0rd!` |
| `admin@echoresilience.org` | `admin` | `Passw0rd!` |
| `viewer@echoresilience.org` | `viewer` | `Passw0rd!` |

---

## 🧪 Verification & End-to-End Test Workflow

1. Open **[http://localhost:5173](http://localhost:5173)** in your browser and sign in.
2. Navigate to **Climate Alerts** → **New Alert**.
3. Select a region, hazard type, and input scientific alert text.
4. Select a target dialect (e.g. `Somali` or `Oromo`) and click **Simplify & Translate**.
5. Click **Send to Community**:
   - Main backend creates `alert_history` and invokes Gemini TTS to synthesize speech `.wav`.
   - Main backend calls IVR Module (`:5002/api/ivr/history/:id/broadcast`).
   - IVR Module invokes Twilio API to place an outbound phone call to community numbers.
   - Your phone rings and plays the spoken localized warning message.

---

## 🛠️ Troubleshooting

- **Twilio plays silence**: Ensure `?ngrok-skip-browser-warning=true` is present on the audio URL so ngrok does not serve an HTML preview page to Twilio.
- **`EADDRINUSE` Error**: Port 5001 or 5002 is already occupied by a background process. Check active node processes with `Get-Process node` or kill existing tasks.
- **Python `GEMINI_API_KEY` missing**: Verify `AI/.env` exists and contains a valid API key from Google AI Studio.
