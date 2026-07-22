const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5001";
const AUTH_TOKEN_KEY = "echo_resilience_token";

export const mockRegions = [
  { id: 1, name: "Turkana Basin", totalRegistered: 450 },
  { id: 2, name: "Marsabit North", totalRegistered: 340 },
  { id: 3, name: "Laisamis", totalRegistered: 280 },
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
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    audioFeedbackUrl: "",
  },
];

export const mockAlertHistory = [
  {
    id: 1,
    alertId: 1,
    regionId: 1,
    status: "dispatched",
    dialect: "Somali",
    simplifiedText: "Flood risk is high. Move away from river banks and follow local officials.",
    translatedText:
      "Khatarta fatahaaddu way sarreysaa. Ka fogow webiyada oo raac tilmaamaha masuuliyiinta.",
    audioUrl: "/api/alerts/1/audio/Somali",
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  },
];

function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
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
    const message = await response.text();
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

  getCommunities: (query) => withFallback(() => request("/api/communities", { query }), []),
  createCommunity: (body) => request("/api/communities", { method: "POST", body }),
  updateCommunity: (id, body) => request(`/api/communities/${id}`, { method: "PATCH", body }),
  deleteCommunity: (id) => request(`/api/communities/${id}`, { method: "DELETE" }),

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
    withFallback(async () => unwrapList(await request("/api/alert-history", { query })), mockAlertHistory),
  getAlertHistoryItem: (id) => request(`/api/alert-history/${id}`),

  getFeedback: (query) =>
    withFallback(async () => unwrapList(await request("/api/feedback", { query })), mockFeedback),
  createFeedback: (body) => request("/api/feedback", { method: "POST", body, auth: false }),
  processFeedback: (id, body) =>
    request(`/api/feedback/${id}/process`, { method: "POST", body, auth: false }),
};
