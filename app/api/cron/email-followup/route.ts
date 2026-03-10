import { NextResponse } from "next/server";
import { getLeadsForFollowUp, markEmailSent } from "@/lib/quiz/google-sheets";
import { getResend, FROM_EMAIL } from "@/lib/quiz/resend";
import { buildDay3Email, buildDay7Email } from "@/lib/quiz/email-templates";

const DAY_MS = 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  // Auth is enforced by middleware.ts -- this is defense-in-depth
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET not configured -- rejecting cron request");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = getResend();
  if (!resend) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Service unavailable" }, { status: 500 });
  }

  const leads = await getLeadsForFollowUp();
  const now = Date.now();
  let sent2 = 0;
  let sent3 = 0;
  let errors = 0;

  for (const lead of leads) {
    try {
      const firstName = lead.name.split(" ")[0];

      // Day 3: email1 sent 3+ days ago, email2 not yet sent
      if (lead.email1Sent && !lead.email2Sent) {
        const email1Time = new Date(lead.email1Sent).getTime();
        if (now - email1Time >= 3 * DAY_MS) {
          const topSuggestion = lead.topSuggestions[0] || "";
          if (topSuggestion) {
            const { subject, html } = buildDay3Email(firstName, topSuggestion, lead.path);
            await resend.emails.send({ from: FROM_EMAIL, to: lead.email, subject, html });
            await markEmailSent(lead.rowIndex, 2);
            sent2++;
          }
        }
      }

      // Day 7: email2 sent 4+ days ago (7 days total), email3 not yet sent
      if (lead.email2Sent && !lead.email3Sent) {
        const email2Time = new Date(lead.email2Sent).getTime();
        if (now - email2Time >= 4 * DAY_MS) {
          const { subject, html } = buildDay7Email(firstName);
          await resend.emails.send({ from: FROM_EMAIL, to: lead.email, subject, html });
          await markEmailSent(lead.rowIndex, 3);
          sent3++;
        }
      }
    } catch (err) {
      console.error("Email follow-up failed:", err instanceof Error ? err.message : "Unknown error");
      errors++;
    }
  }

  // Log details server-side, return minimal response
  console.log(`Cron complete: processed=${leads.length} day3=${sent2} day7=${sent3} errors=${errors}`);
  return NextResponse.json({ ok: true });
}
