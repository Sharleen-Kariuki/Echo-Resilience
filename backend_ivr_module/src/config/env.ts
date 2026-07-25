import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  nlpServiceUrl: process.env.NLP_SERVICE_URL,
  internalServiceKey: process.env.INTERNAL_SERVICE_KEY,
  // SMS and voice are independent channels with independent providers —
  // SMS stays on Africa's Talking (proven working), voice moved to Twilio.
  // SMS_PROVIDER falls back to the old IVR_PROVIDER name for anyone with
  // that still set locally.
  smsProvider: process.env.SMS_PROVIDER || process.env.IVR_PROVIDER || "mock",
  voiceProvider: process.env.VOICE_PROVIDER || "mock",
  africasTalking: {
    username: process.env.AT_USERNAME,
    apiKey: process.env.AT_API_KEY,
    senderId: process.env.AT_SENDER_ID || undefined,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
  // The main backend (backend/) serves AI-generated .wav files at a
  // relative path (alert_history.audio_url, e.g. "/audio/foo.wav"). The
  // voice callback needs an absolute URL to hand the voice provider a
  // <Play url="..."> — and for a real call, that URL must be publicly
  // reachable, same requirement as this module's own voice-callback URL.
  mainApiBaseUrl: process.env.MAIN_API_BASE_URL || "http://localhost:5001",
  // This module's OWN public URL (e.g. an ngrok tunnel to :5002), used to
  // build the callback/status-callback URLs handed to Twilio when placing a
  // call. Twilio's servers cannot reach localhost — see README.
  voiceCallbackBaseUrl: process.env.VOICE_CALLBACK_BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
};

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL is required");
}
