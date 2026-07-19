# Echo-Resilience API Endpoint Reference

All endpoints are hosted on `http://localhost:5001`.

---

## Auth

### `POST /api/auth/register`
- **Description**: Registers a new user.
- **Auth required**: None (open in development).
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "role": "viewer" // Optional: "viewer" | "admin" | "superadmin"
  }
  ```

### `POST /api/auth/login`
- **Description**: Authenticates user and returns a signed JWT token.
- **Auth required**: None.
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbG...",
    "user": {
      "id": 1,
      "email": "john@example.com",
      "role": "viewer",
      "fullName": "John Doe"
    }
  }
  ```

### `GET /api/auth/me`
- **Description**: Returns current authenticated user profile.
- **Auth required**: Yes (Bearer Token).

---

## Dialects

### `GET /api/dialects`
- **Description**: Returns the array of dialects supported by the AI translation and TTS engine.
- **Auth required**: Yes.
- **Response**:
  ```json
  ["Somali", "Oromo", "Amharic", "Swahili", "Turkana"]
  ```

---

## Regions

### `GET /api/regions`
- **Description**: Retrieves all geographical regions.
- **Auth required**: Yes.

### `POST /api/regions`
- **Description**: Creates a new region.
- **Auth required**: Yes (Admin only).
- **Body**:
  ```json
  {
    "name": "Turkana Basin"
  }
  ```

---

## Hazard Types

### `GET /api/hazard-types`
- **Description**: Retrieves all hazard types.
- **Auth required**: Yes.

### `POST /api/hazard-types`
- **Description**: Creates a new hazard type.
- **Auth required**: Yes (Admin only).
- **Body**:
  ```json
  {
    "name": "Locust"
  }
  ```

---

## Communities

### `GET /api/communities`
- **Description**: Retrieves communities.
- **Query Params**: `regionId` (optional filter).
- **Auth required**: Yes.

### `POST /api/communities`
- **Description**: Creates a new community registry.
- **Auth required**: Yes (Admin only).
- **Body**:
  ```json
  {
    "name": "Lodwar Central",
    "regionId": 1,
    "totalRegistered": 450, // Optional
    "source": "RedCross Census", // Optional
    "status": "active", // Optional
    "actions": "Prepare flood walls" // Optional
  }
  ```

### `PATCH /api/communities/:id`
- **Description**: Updates community metadata.
- **Auth required**: Yes (Admin only).

### `DELETE /api/communities/:id`
- **Description**: Deletes a community.
- **Auth required**: Yes (Admin only).

---

## Alerts

### `GET /api/alerts`
- **Description**: Retrieves a paginated list of alerts.
- **Query Params**: `hazardTypeId` (optional), `regionId` (optional), `page` (default 1), `limit` (default 20).
- **Auth required**: Yes.

### `POST /api/alerts`
- **Description**: Creates a raw scientific alert.
- **Auth required**: Yes (Admin only).
- **Body**:
  ```json
  {
    "hazardTypeId": 1,
    "severityLevel": "High",
    "rawScientificDescription": "Heavy convective precipitation exceeding 180 mm is expected...",
    "regionIds": [1, 2]
  }
  ```

### `GET /api/alerts/:id`
- **Description**: Retrieves detailed view of an alert, targeted regions, and dispatch history.
- **Auth required**: Yes.

### `DELETE /api/alerts/:id`
- **Description**: Deletes an alert.
- **Auth required**: Yes (Admin only).

### `POST /api/alerts/:id/process`
- **Description**: Runs Gemini simplify, translate, and extraction step. Does not generate audio.
- **Auth required**: Yes (Admin only).
- **Body**:
  ```json
  {
    "regionId": 1,
    "dialect": "Somali"
  }
  ```

### `POST /api/alerts/:id/generate-audio`
- **Description**: Generates a TTS audio file (.wav) for a previously processed alert text.
- **Auth required**: Yes (Admin only).
- **Body**:
  ```json
  {
    "regionId": 1,
    "dialect": "Somali"
  }
  ```

### `GET /api/alerts/:id/audio/:dialect`
- **Description**: Serves or redirects to the generated audio file. **Used by IVR teammate**.
- **Auth required**: None.

### `POST /api/alerts/:id/dispatch`
- **Description**: Bulk endpoint that executes simplify + translate + audio generation in one request.
- **Auth required**: Yes (Admin only).
- **Body**:
  ```json
  {
    "regionId": 1,
    "dialect": "Somali",
    "generateAudio": true // Optional (default: true)
  }
  ```

---

## Alert History

### `GET /api/alert-history`
- **Description**: List of all processed/dispatched alerts and their statuses.
- **Query Params**: `alertId`, `regionId`, `status`, `dialect`, `page`, `limit` (all optional).
- **Auth required**: Yes.

### `GET /api/alert-history/:id`
- **Description**: Retrieves single history dispatch status with related feedback logs.
- **Auth required**: Yes.

---

## Feedback

### `GET /api/feedback`
- **Description**: Retrieves a paginated list of feedback logs.
- **Query/Filter Params**: `alertHistoryId`, `regionId`, `hazardTypeId`, `page`, `limit`.
- **Auth required**: Yes.

### `POST /api/feedback`
- **Description**: Logs raw community feedback.
- **Auth required**: None (called by IVR handler webhook).
- **Body**:
  ```json
  {
    "alertHistoryId": 1,
    "regionId": 1,
    "hazardTypeId": 1,
    "audioFeedbackUrl": "/audio/filename.wav", // Optional
    "translationText": "Unprocessed keypress or callback text" // Optional
  }
  ```

### `POST /api/feedback/:id/process`
- **Description**: Transcribes the recorded voice feedback, translates it to English, and categorizes hazard type using Gemini native audio.
- **Auth required**: None.
- **Body**:
  ```json
  {
    "audio_local_path": "generated_audio/feedback_file.wav", // Optional (falls back to db audioFeedbackUrl)
    "dialect_hint": "Somali" // Optional
  }
  ```
