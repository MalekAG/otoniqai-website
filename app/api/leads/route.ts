import { NextResponse } from "next/server";
import { leadApiSchema } from "@/lib/quiz/schemas";
import { appendLead } from "@/lib/quiz/google-sheets";
import { getResend, FROM_EMAIL } from "@/lib/quiz/resend";
import { buildDay0Email } from "@/lib/quiz/email-templates";

const MAX_BODY_SIZE = 10_000; // 10 KB

// In-memory rate limiter: 10 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;

function cleanupExpired() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Periodic cleanup to prevent memory leak
  if (rateLimitMap.size > 1000) cleanupExpired();

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  // Use platform-specific non-spoofable headers, fall back to x-forwarded-for
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  // Origin validation (CSRF protection)
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean);
  if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Body size limit + safe JSON parse
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_SIZE) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadApiSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const safeErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] ?? "Invalid"])
    );
    return NextResponse.json(
      { error: "Invalid data", fields: safeErrors },
      { status: 400 }
    );
  }

  const { name, email, company, path, answers, topSuggestions, readinessTier, readinessMessage } =
    parsed.data;

  const now = new Date().toISOString();

  try {
    // Send Day 0 email first, only write email1_sent if it succeeds
    const resend = getResend();
    let emailSent = false;

    if (resend) {
      const firstName = name.split(" ")[0];
      const { subject, html } = buildDay0Email(firstName, readinessTier, topSuggestions, readinessMessage);
      try {
        await resend.emails.send({ from: FROM_EMAIL, to: email, subject, html });
        emailSent = true;
      } catch (err) {
        console.error("Day 0 email failed:", err instanceof Error ? err.message : "Unknown error");
      }
    }

    await appendLead([
      now,
      name,
      email,
      company,
      path,
      JSON.stringify(answers),
      topSuggestions.join(", "),
      readinessTier || "",
      emailSent ? now : "", // email1_sent -- only if email actually sent
      "",  // email2_sent
      "",  // email3_sent
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheets error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
