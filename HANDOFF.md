# EchoResilience — Session Handoff

Branch: `feat/frotend-connectendpoints`
Scope of this document: everything built/changed in this working session, none of it committed yet — review and commit at your discretion.

## 1. New pages & routes

| Route | Page | Notes |
|---|---|---|
| `/` | Dashboard | Existing page; Recent Alerts and Live Feedback panels made fully interactive (see §3) |
| `/alerts` | **Alert History** (new) | Search/filter/paginate dispatch history, click a row for detail |
| `/alerts/new` | Create Alert | Existing page, moved from `/alerts`; added a back-link, working "Save Draft", and hazard-type creation |
| `/feedback` | Community Feedback | Existing page; "Mark as Resolved" and "Export Report" made real |
| `/feedback-map` | **Feedback Map** (new) | Real Leaflet + OpenStreetMap map, colored pins by report severity, feedback log side panel |
| `/communities` | **Communities** (new) | Stats, table, "Add Community" / "Add Region" modals, reactivate/delete |
| `/analytics` | **Analytics & Reports** (new) | KPIs, hazard/region/dialect bar charts, status donut, calls/feedback trend lines, CSV export |
| `/login` | **Login** (new) | Matches your provided mockup |
| `/register` | **Register** (new) | Same visual shell as Login |

Sidebar nav updated to include Feedback Map, Communities, and reflects the real signed-in user (name/role/initials) instead of a hardcoded "Admin User".

## 2. Auth system (new)

- `src/lib/auth.jsx` — `AuthProvider` + `useAuth()`. Validates any existing token against `GET /api/auth/me` on load; exposes `login`, `register`, `logout`.
- `src/components/auth/RequireAuth.jsx` — guards every app route; redirects to `/login` (and remembers where you were headed) if not signed in.
- Login supports "Remember this session" — checked stores the token in `localStorage` (persists), unchecked uses `sessionStorage` (clears when the tab closes).
- Register auto-logs-in afterward since `POST /api/auth/register` doesn't return a token itself. Role is selectable (Viewer / Admin / Super Admin) since the backend's `user_role` enum supports all three.
- No backend password-reset flow exists, so "Forgot password?" shows an inline "contact your system administrator" hint rather than a dead link.
- **Important side effect**: before this, no page ever sent a valid auth token, so every real API call 401'd and every page silently fell back to mock data. That's now fixed — real data flows once you're logged in.

## 3. Backend endpoints wired to real UI

These existed in the backend already but had no frontend affordance before this session:

- `GET /api/alerts/:id`, `DELETE /api/alerts/:id` → Dashboard's Recent Alerts table (click a row for detail, trash icon to delete, with a confirm prompt)
- `DELETE /api/communities/:id` → Communities table actions column
- `POST /api/hazard-types` → "+" button next to the Hazard Type dropdown on the Create Alert page
- `GET /api/alert-history/:id` → Alert History row click → detail modal

## 4. Backend changes

### Schema / migrations (both applied to your local DB)
- `20260721093112_add_region_geo` — added `latitude`, `longitude` (nullable `Float`) to `Region`, so the Feedback Map has real coordinates to plot.
- `20260721102742_add_feedback_status_and_response` — added `status`, `adminResponse`, `respondedAt` to `FeedbackLog`, so "Mark as Resolved" and admin replies to feedback are real, persisted actions instead of no-ops.

### New/changed routes
- `PATCH /api/feedback/:id` (new) — updates `status` and/or `adminResponse`; used by the Resolve action and the Live Feedback reply box.
- `POST /api/regions` — now accepts optional `latitude`/`longitude`.
- `POST /api/feedback/:id/process` — now also sets `status: "processed"`.

### CORS fix
Backend only allowed `http://localhost:3000` (a stale assumption from an earlier Next.js setup); Vite's dev server actually runs on `http://localhost:5173`, so every request was silently blocked by the browser ("Failed to fetch"). Fixed in `backend/src/index.js` + `backend/.env` — `FRONTEND_URL` now accepts a comma-separated list and defaults to both `5173` and `3000`. **If your backend is running, restart it** to pick this up — env vars only load once at process startup.

### Seed script (new)
`database/prisma/seed.js`, wired via the standard `prisma db seed` convention. Clears existing rows and creates:
- 3 users (one per role) — see credentials below
- 5 regions with real lat/lng
- 6 hazard types, 8 communities, 6 alerts, 12 alert-history dispatch records (spread over ~12 days, mixed statuses), 8 feedback logs (mixed statuses, some with admin responses)

Run it any time with:
```
cd database && npm run prisma:seed
```

**Seeded login credentials** (password is the same for all three — change before anything resembling production use):

| Email | Role | Password |
|---|---|---|
| `superadmin@echoresilience.org` | superadmin | `Passw0rd!` |
| `admin@echoresilience.org` | admin | `Passw0rd!` |
| `viewer@echoresilience.org` | viewer | `Passw0rd!` |

## 5. Other fixes this session

- **Dashboard**: "View All" now navigates to Alert History; Live Feedback replies persist via the new PATCH endpoint and show inline once sent.
- **Community Feedback**: "Mark as Resolved" is a distinct, real action from "Process Audio" now (previously both buttons called the same handler).
- **Feedback Map**: the "⋮" menu on each report opens a full-detail modal or copies the region name.
- **Dead code removed**: `src/features/dashboard/{RecentAlertsTable,LiveFeedbackPanel,StatCard}.jsx` — all three were orphaned duplicates of components `DashboardPage.jsx` defines locally.

## 6. Known gaps (not done, intentionally out of scope so far)

- Notification bell (top-right on every page) — no dropdown, decorative.
- Footer links (Privacy Policy / Terms / Help Center / API Documentation) — go nowhere.
- No password-reset flow (see §2).
- The `database/` and `backend/` folders each keep their own `.env`; there's no `.env.example` committed yet — worth adding before onboarding another dev.

## 7. Running it locally

```bash
# 1. Postgres running locally, matching backend/.env's DATABASE_URL

# 2. Apply migrations + generate client
cd database && npx prisma migrate deploy   # or migrate dev if you're changing schema
cd database && npm run prisma:seed         # populate sample data

# 3. Backend
cd backend && npm run dev                  # http://localhost:5001

# 4. Frontend
npm run dev                                # http://localhost:5173

# 5. Sign in at /login with one of the seeded accounts above
```

## 8. Note on git

None of this is committed yet. `git status` currently shows the modified/new files listed throughout this doc, plus `database/prisma/migrations/` (previously untracked entirely, including the pre-existing initial migration). `.env` files are correctly gitignored — no credentials will be committed. See the top of this conversation for the distinction between committing *schema/migrations/seed* (code, shareable) versus your actual database *contents* (local to your machine, not shared by git).
