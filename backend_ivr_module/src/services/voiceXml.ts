function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Twilio TwiML response — <Play> a pre-generated audio file. The URL is the
// element's TEXT CONTENT (not a "url" attribute — that's a different
// vendor's convention), per Twilio's <Play> verb spec. Preferred whenever
// alert_history.audio_url exists: our own TTS pipeline already produced and
// human-verified this audio (see AI/README.md's warning about not trusting
// a telephony provider's built-in <Say> voices for Somali/Oromo/Turkana), so
// playing it directly is both more reliable and higher quality.
export function buildPlayResponse(audioUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Play>${escapeXml(audioUrl)}</Play></Response>`;
}

// Fallback when no audio has been generated yet for this alert/dialect —
// uses Twilio's own TTS voice. Only acceptable as a last resort; see the
// caveat above.
export function buildSayResponse(message: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="woman">${escapeXml(message)}</Say></Response>`;
}
