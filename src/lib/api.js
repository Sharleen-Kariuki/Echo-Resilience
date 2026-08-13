// The checked-in backend environment listens on 5001. Deployments can
// override this through VITE_API_BASE_URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5001";
const AUTH_TOKEN_KEY = "echo_resilience_token";

export const mockRegions = [
  { id: 1, name: "Turkana Basin", totalRegistered: 450, latitude: 3.1167, longitude: 35.6, source: "ASAL Areas" },
  { id: 2, name: "Marsabit North", totalRegistered: 340, latitude: 2.3284, longitude: 37.9899, source: "ASAL Areas" },
  { id: 3, name: "Laisamis", totalRegistered: 280, latitude: 1.6167, longitude: 37.7833, source: "ASAL Areas" },
  { id: 4, name: "Meru County", totalRegistered: 610, latitude: 0.2333, longitude: 37.9333, source: "ASAL Areas" },
  { id: 5, name: "Tharaka-Nithi", totalRegistered: 195, latitude: -0.2833, longitude: 37.75, source: "ASAL Areas" },
];

export const mockCommunities = [
  {
    id: 1,
    name: "Turkana Riverside Network",
    region: { id: 1, name: "Turkana Basin" },
    totalRegistered: 3420,
    registrationDate: new Date("2023-10-12").toISOString(),
    source: "self-registered",
    status: "active",
  },
  {
    id: 2,
    name: "Marsabit Herders Collective",
    region: { id: 2, name: "Marsabit North" },
    totalRegistered: 1180,
    registrationDate: new Date("2023-11-05").toISOString(),
    source: "admin-added",
    status: "active",
  },
  {
    id: 3,
    name: "Laisamis Women's Group",
    region: { id: 3, name: "Laisamis" },
    totalRegistered: 640,
    registrationDate: new Date("2023-11-28").toISOString(),
    source: "self-registered",
    status: "opted-out",
  },
  {
    id: 4,
    name: "Meru Highland Farmers",
    region: { id: 4, name: "Meru County" },
    totalRegistered: 2205,
    registrationDate: new Date("2023-12-01").toISOString(),
    source: "self-registered",
    status: "active",
  },
  {
    id: 5,
    name: "Tharaka Relief Committee",
    region: { id: 5, name: "Tharaka-Nithi" },
    totalRegistered: 890,
    registrationDate: new Date("2024-01-15").toISOString(),
    source: "admin-added",
    status: "active",
  },
  {
    id: 6,
    name: "Turkana Fisherfolk Alliance",
    region: { id: 1, name: "Turkana Basin" },
    totalRegistered: 512,
    registrationDate: new Date("2024-02-08").toISOString(),
    source: "self-registered",
    status: "active",
  },
  {
    id: 7,
    name: "Marsabit Youth Network",
    region: { id: 2, name: "Marsabit North" },
    totalRegistered: 275,
    registrationDate: new Date("2024-03-21").toISOString(),
    source: "self-registered",
    status: "opted-out",
  },
  {
    id: 8,
    name: "Meru Market Traders",
    region: { id: 4, name: "Meru County" },
    totalRegistered: 1340,
    registrationDate: new Date("2024-04-10").toISOString(),
    source: "admin-added",
    status: "active",
  },
];

// Development-only recipient records. These are deliberately distinct from
// live registrations and are used only when the Members API is unavailable.
export const mockMembers = [
  { id: "mock-member-1", fullName: "Amina Ekiru", phone: "+254712300001", language: "Turkana", locality: "Kanamkemer", regionId: 1, communityId: 1, communityName: "Turkana Riverside Network", source: "admin-added", status: "active" },
  { id: "mock-member-2", fullName: "Samuel Lomuria", phone: "+254712300002", language: "Turkana", locality: "Lodwar Central", regionId: 1, communityId: 6, communityName: "Turkana Fisherfolk Alliance", source: "self-registered", status: "active" },
  { id: "mock-member-3", fullName: "Hawa Galgalo", phone: "+254712300003", language: "Oromo", locality: "Sololo", regionId: 2, communityId: 2, communityName: "Marsabit Herders Collective", source: "admin-added", status: "active" },
  { id: "mock-member-4", fullName: "Abdi Jillo", phone: "+254712300004", language: "Oromo", locality: "Marsabit Town", regionId: 2, communityId: 7, communityName: "Marsabit Youth Network", source: "self-registered", status: "opted-out" },
  { id: "mock-member-5", fullName: "Fatuma Diba", phone: "+254712300005", language: "Somali", locality: "Laisamis", regionId: 3, communityId: 3, communityName: "Laisamis Women's Group", source: "self-registered", status: "opted-out" },
  { id: "mock-member-6", fullName: "Hassan Wario", phone: "+254712300006", language: "Somali", locality: "Loglogo", regionId: 3, communityId: 3, communityName: "Laisamis Women's Group", source: "admin-added", status: "active" },
  { id: "mock-member-7", fullName: "Martha Kendi", phone: "+254712300007", language: "Swahili", locality: "Imenti North", regionId: 4, communityId: 4, communityName: "Meru Highland Farmers", source: "self-registered", status: "active" },
  { id: "mock-member-8", fullName: "Peter Muriuki", phone: "+254712300008", language: "Swahili", locality: "Meru Town", regionId: 4, communityId: 8, communityName: "Meru Market Traders", source: "admin-added", status: "active" },
  { id: "mock-member-9", fullName: "Joyce Muthoni", phone: "+254712300009", language: "Amharic", locality: "Chuka", regionId: 5, communityId: 5, communityName: "Tharaka Relief Committee", source: "admin-added", status: "active" },
  { id: "mock-member-10", fullName: "Daniel Mwangi", phone: "+254712300010", language: "Amharic", locality: "Maara", regionId: 5, communityId: 5, communityName: "Tharaka Relief Committee", source: "self-registered", status: "active" },
];

export const mockHazardTypes = [
  { id: 1, name: "Flood" },
  { id: 2, name: "Drought" },
  { id: 3, name: "Heat Wave" },
  { id: 4, name: "Locust" },
];

export const mockDialects = ["Somali", "Oromo", "Amharic", "Swahili", "Turkana"];

export const mockAlerts = [
  {
    id: 1,
    hazardTypeId: 1,
    hazardType: { name: "Flood Warning" },
    severityLevel: "Critical",
    rawScientificDescription: "Heavy convective precipitation exceeding 180 mm is expected.",
    regions: [{ id: 1, name: "Turkana Basin" }],
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    hazardTypeId: 2,
    hazardType: { name: "Drought" },
    severityLevel: "High",
    rawScientificDescription: "Pasture stress and water scarcity are expected to worsen.",
    regions: [{ id: 2, name: "Marsabit North" }],
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
];

export const mockFeedback = [
  {
    id: 1,
    regionId: 1,
    hazardTypeId: 1,
    region: { name: "Turkana Basin" },
    hazardType: { name: "Flood" },
    translationText: "Water levels are rising near the old bridge. Need immediate sandbags.",
    transcriptionText: "Biyaha waxay ku kordhayaan buundada hore.",
    dialect: "Somali",
    severity: "Critical",
    status: "processed",
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    audioFeedbackUrl: "",
  },
  {
    id: 2,
    regionId: 2,
    hazardTypeId: 2,
    region: { name: "Marsabit North" },
    hazardType: { name: "Drought" },
    translationText: "The water point is nearly empty and livestock are moving south.",
    transcriptionText: "The community reports water shortages.",
    dialect: "Oromo",
    severity: "High",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    audioFeedbackUrl: "",
  },
];

export const mockAlertHistory = [
  {
    id: 1,
    alertId: 1,
    regionId: 1,
    hazardType: { name: "Flash Flood" },
    region: { name: "Lower Juba District" },
    dialects: ["Maay", "Mahaa"],
    status: "dispatched",
    dialect: "Somali",
    callsCount: 12402,
    feedbackCount: 842,
    simplifiedText: "Flood risk is high. Move away from river banks and follow local officials.",
    translatedText:
      "Khatarta fatahaaddu way sarreysaa. Ka fogow webiyada oo raac tilmaamaha masuuliyiinta.",
    audioUrl: "/api/alerts/1/audio/Somali",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    alertId: 2,
    regionId: 2,
    hazardType: { name: "Wind Storm" },
    region: { name: "Central Plateau" },
    dialects: ["Bambara"],
    status: "dispatched",
    dialect: "Bambara",
    callsCount: 8950,
    feedbackCount: 1105,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    alertId: 3,
    regionId: 3,
    hazardType: { name: "Locust Swarm" },
    region: { name: "Northern Plains" },
    dialects: ["Afar", "Saho"],
    status: "in_progress",
    dialect: "Afar",
    callsCount: 4200,
    feedbackCount: 0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    alertId: 4,
    regionId: 1,
    hazardType: { name: "Heatwave" },
    region: { name: "Rift Valley North" },
    dialects: ["Swahili"],
    status: "dispatched",
    dialect: "Swahili",
    callsCount: 25110,
    feedbackCount: 3490,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    alertId: 5,
    regionId: 2,
    hazardType: { name: "Landslide Risk" },
    region: { name: "Western Peaks" },
    dialects: ["Fula", "Wolof"],
    status: "failed",
    dialect: "Wolof",
    callsCount: 0,
    feedbackCount: 0,
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthToken() {
  return getToken();
}

// `remember` controls where the token lives: localStorage survives browser
// restarts, sessionStorage clears when the tab closes ("Remember this session").
export function setAuthToken(token, remember = true) {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  if (!token) return;
  (remember ? localStorage : sessionStorage).setItem(AUTH_TOKEN_KEY, token);
}

function buildUrl(path, query) {
  const url = new URL(path, API_BASE_URL);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

// Backend routes return audio as a relative path (e.g. "/audio/foo.wav").
// The frontend dev server and API don't share an origin, so relative <audio
// src="..."> tags resolve against the wrong host — always route them through
// this to get an absolute URL that actually points at the API.
export function resolveAudioUrl(path) {
  if (!path) return "";
  return new URL(path, API_BASE_URL).toString();
}

async function request(path, { method = "GET", body, query, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const raw = await response.text();
    let message = raw;
    try {
      message = JSON.parse(raw)?.error || raw;
    } catch {
      // Not JSON — use the raw text as-is.
    }
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function withFallback(fetcher, fallback) {
  try {
    return { data: await fetcher(), usingMock: false };
  } catch (error) {
    console.warn("Using mock data after API request failed:", error);
    return { data: fallback, usingMock: true, error };
  }
}

function unwrapList(payload, keys = ["items", "data", "results", "alerts", "feedback", "history"]) {
  if (Array.isArray(payload)) return payload;
  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  return [];
}

export const api = {
  login: (body) => request("/api/auth/login", { method: "POST", body, auth: false }),
  register: (body) => request("/api/auth/register", { method: "POST", body, auth: false }),
  me: () => request("/api/auth/me"),

  getDialects: () => withFallback(() => request("/api/dialects"), mockDialects),
  getRegions: () => withFallback(() => request("/api/regions"), mockRegions),
  createRegion: (body) => request("/api/regions", { method: "POST", body }),

  getHazardTypes: () => withFallback(() => request("/api/hazard-types"), mockHazardTypes),
  createHazardType: (body) => request("/api/hazard-types", { method: "POST", body }),

  getCommunities: (query) =>
    withFallback(async () => unwrapList(await request("/api/communities", { query }), ["items", "data", "results", "communities"]), mockCommunities),
  createCommunity: (body) => request("/api/communities", { method: "POST", body }),
  updateCommunity: (id, body) => request(`/api/communities/${id}`, { method: "PATCH", body }),
  deleteCommunity: (id) => request(`/api/communities/${id}`, { method: "DELETE" }),

  getMembers: (query) => withFallback(async () => unwrapList(await request("/api/members", { query }), ["items", "data", "results", "members"]), mockMembers),
  getMemberReachSummary: (regionIds) => request("/api/members/summary", { query: { regionIds: regionIds.join(",") } }),
  createMember: (body) => request("/api/members", { method: "POST", body }),
  updateMember: (id, body) => request(`/api/members/${id}`, { method: "PATCH", body }),
  deleteMember: (id) => request(`/api/members/${id}`, { method: "DELETE" }),

  getAlerts: (query) =>
    withFallback(async () => unwrapList(await request("/api/alerts", { query })), mockAlerts),
  createAlert: (body) => request("/api/alerts", { method: "POST", body }),
  getAlert: (id) => request(`/api/alerts/${id}`),
  deleteAlert: (id) => request(`/api/alerts/${id}`, { method: "DELETE" }),
  processAlert: (id, body) => request(`/api/alerts/${id}/process`, { method: "POST", body }),
  generateAlertAudio: (id, body) =>
    request(`/api/alerts/${id}/generate-audio`, { method: "POST", body }),
  dispatchAlert: (id, body) => request(`/api/alerts/${id}/dispatch`, { method: "POST", body }),
  getAlertAudioUrl: (id, dialect) => buildUrl(`/api/alerts/${id}/audio/${dialect}`),

  getAlertHistory: (query) =>
    withFallback(
      async () => unwrapList(await request("/api/alert-history", { query }), ["items", "data", "results", "alerts", "feedback", "history", "records"]),
      mockAlertHistory,
    ),
  getAlertHistoryItem: (id) => request(`/api/alert-history/${id}`),

  getFeedback: (query) =>
    withFallback(
      async () => unwrapList(await request("/api/feedback", { query }), ["items", "data", "results", "alerts", "feedback", "history", "logs"]),
      mockFeedback,
    ),
  createFeedback: (body) => request("/api/feedback", { method: "POST", body, auth: false }),
  processFeedback: (id, body) =>
    request(`/api/feedback/${id}/process`, { method: "POST", body, auth: false }),
  updateFeedback: (id, body) => request(`/api/feedback/${id}`, { method: "PATCH", body }),
};
