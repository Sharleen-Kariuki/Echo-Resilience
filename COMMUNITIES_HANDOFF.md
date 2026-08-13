# Communities and Members Handoff

This document covers the Communities page integration completed in August 2026.

## Changes made

### Frontend

- `src/pages/CommunitiesPage.jsx`: loads real members from `GET /api/members`; uses clearly labelled samples only when the API is unavailable; and supports Community/Region offline samples.
- `src/components/ui/Modal.jsx`: adds a viewport height limit and an internally scrollable content area, so the Register Member submit action is reachable on short screens.
- `src/lib/api.js`: adds `getMembers`, `createMember`, `updateMember`, and `deleteMember`, plus ten mock members covering Somali, Oromo, Amharic, Swahili, and Turkana.
- The default API address is `http://localhost:5001`; set `VITE_API_BASE_URL` to override it.

### Backend

- `backend/src/routes/members.js`: authenticated member CRUD endpoints:
  - `GET /api/members` (supports `regionId` and `communityId` filters)
  - `GET /api/members/summary?regionIds=1,3`: read-only, live reach estimate by region and language for the alert composer
  - `POST /api/members`, `PATCH /api/members/:id`, and `DELETE /api/members/:id` (admin/superadmin)
- `backend/src/index.js`: registers `/api/members`.
- `backend/src/routes/communities.js`: persists the Community form's `type` and `leaderPhone` fields.
- `backend/src/lib/prisma.js`: uses the generated client in `database/`, avoiding the stale backend-local Prisma client issue.

### Database

- `database/prisma/schema.prisma`: adds Community `type`/`leaderPhone` and a Member model related to Region and Community. Member phone numbers are unique.
- `20260813150000_add_community_details`: Community detail columns.
- `20260813153000_add_members`: members table, foreign keys, and indexes.
- `prisma/seed.js`: full-reset demo data including richer Communities and members.
- `prisma/seed-members.js`: non-destructive upsert of 10 sample members.

## Required steps after pulling

From the repository root, install dependencies, apply migrations, and regenerate Prisma clients:

```powershell
cd C:\Users\Hp\OneDrive\Documents\ICPAC_FRONTEND\database
npm.cmd install
npm.cmd exec prisma migrate deploy
npm.cmd run prisma:generate

cd ..\backend
npm.cmd install
npm.cmd run prisma:generate
```

Restart the backend after generation:

```powershell
cd C:\Users\Hp\OneDrive\Documents\ICPAC_FRONTEND\backend
npm.cmd run dev
```

Start the frontend in another terminal:

```powershell
cd C:\Users\Hp\OneDrive\Documents\ICPAC_FRONTEND
npm.cmd install
npm.cmd run dev
```

The backend must use `PORT=5001` and `FRONTEND_URL` must include `http://localhost:5173`.

## Sample data options

Add or refresh only member samples without deleting existing data:

```powershell
cd C:\Users\Hp\OneDrive\Documents\ICPAC_FRONTEND\database
npm.cmd run prisma:seed:members
```

Reset all local demo data (users, regions, communities, members, alerts, and feedback):

```powershell
cd C:\Users\Hp\OneDrive\Documents\ICPAC_FRONTEND\database
npm.cmd run prisma:seed
```

> `prisma:seed` deletes current database data first. Never run it against shared or production data.

## Verification checklist

1. Sign in as an admin or superadmin.
2. Open **Communities**; the Members tab should load without a member-record error.
3. Confirm all five languages are present after seeding.
4. Open **Register Member** and scroll to the bottom; its submit button must be reachable.
5. Add a member and refresh; it should remain visible.
6. Add a Community with a type and leader phone and verify those fields are retained after refresh.

## Alert and Community relationship

```text
Region -> Community -> Member
Alert -> AlertRegion
Alert dispatch -> AlertHistory (region + dialect)
```

An alert targets one or more Regions. As each Region is selected, the Create Alert page calls the member summary endpoint and displays the count of active Members with valid phone numbers, including a Region-by-Region breakdown. Dispatching runs once for every selected Region (using the selected dialect), then saves one `alert_history` record per Region. Members correlate through `regionId`, and are further organized by `communityId` and `language`.

The current dispatch endpoint creates the translated/audio dispatch record but does **not** send to individual member phones yet. Production delivery requires an IVR/SMS provider plus a recipient-delivery table containing the member, dispatch, provider ID, delivery state, and timestamp.

## Validation completed

- Prisma schema validation passed.
- Migrations and generated client were applied.
- Authenticated Members and Communities reads returned HTTP 200.
- Member create, update, and delete were tested.
- The frontend production build passed.
