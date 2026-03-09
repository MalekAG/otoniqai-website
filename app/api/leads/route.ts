import { NextResponse } from "next/server";
import { leadApiSchema } from "@/lib/quiz/schemas";
import { appendLead } from "@/lib/quiz/google-sheets";
import { getResend, FROM_EMAIL } from "@/lib/quiz/resend";
import { buildDay0Email } from "@/lib/quiz/email-templates";

// In-memory rate limiter: 10 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = leadApiSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, company, path, answers, topSuggestions, readinessTier, readinessMessage } =
    parsed.data;

  const now = new Date().toISOString();

  try {
    await appendLead([
      now,
      name,
      email,
      company,
      path,
      JSON.stringify(answers),
      topSuggestions.join(", "),
      readinessTier || "",
      now, // email1_sent -- Day 0 email sent immediately
      "",  // email2_sent
      "",  // email3_sent
    ]);

    // Send Day 0 email (fire-and-forget -- don't block response)
    const resend = getResend();
    if (resend) {
      const firstName = name.split(" ")[0];
      const { subject, html } = buildDay0Email(firstName, readinessTier, topSuggestions, readinessMessage);
      resend.emails
        .send({ from: FROM_EMAIL, to: email, subject, html })
        .catch((err) => console.error("Day 0 email failed:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheets error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
