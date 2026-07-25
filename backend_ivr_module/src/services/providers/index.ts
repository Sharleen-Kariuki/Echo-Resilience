import { env } from "../../config/env.js";
import { mockCallProvider } from "./mockCallProvider.js";
import { twilioCallProvider } from "./twilioCallProvider.js";
import type { CallProvider } from "./callProvider.types.js";

const CALL_PROVIDERS: Record<string, CallProvider> = {
  mock: mockCallProvider,
  twilio: twilioCallProvider,
};

// Selected via VOICE_PROVIDER — independent from SMS_PROVIDER (see
// ../sms/index.ts), since voice and SMS now use different vendors
// (Twilio for voice, Africa's Talking for SMS).
export function getCallProvider(): CallProvider {
  const provider = CALL_PROVIDERS[env.voiceProvider];

  if (!provider) {
    throw new Error(`Unknown VOICE_PROVIDER "${env.voiceProvider}". Expected "mock" or "twilio".`);
  }

  return provider;
}
