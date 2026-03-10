import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const fallback = "OtoniqAI <onboarding@resend.dev>";
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || (() => {
  console.warn("RESEND_FROM_EMAIL not set -- using sandbox fallback");
  return fallback;
})();
