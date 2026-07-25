import { env } from "../../config/env.js";
import { mockSmsProvider } from "./mockSmsProvider.js";
import { africasTalkingSmsProvider } from "./africasTalkingSmsProvider.js";
import type { SmsProvider } from "./smsProvider.types.js";

const PROVIDERS: Record<string, SmsProvider> = {
  mock: mockSmsProvider,
  africastalking: africasTalkingSmsProvider,
};

// Selected via SMS_PROVIDER so the demo can flip between a safe mock and the
// real Africa's Talking sandbox with an env change, no code/deploy change.
export function getSmsProvider(): SmsProvider {
  const provider = PROVIDERS[env.smsProvider];

  if (!provider) {
    throw new Error(
      `Unknown SMS_PROVIDER "${env.smsProvider}". Expected "mock" or "africastalking".`
    );
  }

  return provider;
}
