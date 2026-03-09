import { suggestions as allSuggestions } from "./quiz-data";

const BRAND = {
  primary: "#0D5E6B",
  accent: "#D4A574",
  bg: "#FAF8F5",
  fg: "#1A1A1A",
  muted: "#5C5C5C",
} as const;

const BOOKING_URL = "https://calendly.com/otoniqai/discovery";

function layout(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};font-family:Arial,Helvetica,sans-serif;color:${BRAND.fg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background-color:#ffffff;border-radius:8px;overflow:hidden;">
<!-- Header -->
<tr><td style="background-color:${BRAND.primary};padding:24px 32px;">
  <span style="font-size:22px;font-weight:bold;color:#ffffff;">OtoniqAI</span>
</td></tr>
<!-- Body -->
<tr><td style="padding:32px;">
${body}
</td></tr>
<!-- Footer -->
<tr><td style="padding:24px 32px;border-top:1px solid #E5E5E5;">
  <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.6;">
    You received this because you took the OtoniqAI AI Readiness Quiz.<br>
    &copy; ${new Date().getFullYear()} OtoniqAI. All rights reserved.
  </p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function ctaButton(text: string, url: string = BOOKING_URL): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
<tr><td style="background-color:${BRAND.primary};border-radius:6px;padding:14px 28px;">
  <a href="${url}" target="_blank" style="color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;display:inline-block;">${text}</a>
</td></tr>
</table>`;
}

export function buildDay0Email(
  firstName: string,
  readinessTier: string | undefined,
  topSuggestions: string[],
  tierMessage?: string,
): { subject: string; html: string } {
  const tierBlock = readinessTier
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
<tr><td style="background-color:${BRAND.bg};border-left:4px solid ${BRAND.primary};padding:16px 20px;border-radius:4px;">
  <p style="margin:0 0 4px;font-size:12px;font-weight:bold;color:${BRAND.primary};text-transform:uppercase;letter-spacing:0.5px;">Your AI Readiness</p>
  <p style="margin:0 0 4px;font-size:18px;font-weight:bold;color:${BRAND.fg};">${readinessTier}</p>
  ${tierMessage ? `<p style="margin:0;font-size:14px;color:${BRAND.muted};">${tierMessage}</p>` : ""}
</td></tr>
</table>`
    : "";

  const suggestionsList = topSuggestions
    .map(
      (title, i) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #F0F0F0;">
  <span style="display:inline-block;width:24px;height:24px;background-color:${i === 0 ? BRAND.accent : BRAND.primary};color:#ffffff;border-radius:50%;text-align:center;line-height:24px;font-size:13px;font-weight:bold;margin-right:12px;">${i + 1}</span>
  <span style="font-size:15px;font-weight:600;color:${BRAND.fg};">${title}</span>
</td></tr>`,
    )
    .join("");

  const body = `
<p style="font-size:16px;line-height:1.6;color:${BRAND.fg};margin:0 0 16px;">Hi ${firstName},</p>
<p style="font-size:15px;line-height:1.6;color:${BRAND.fg};margin:0 0 8px;">Thanks for taking our AI Readiness Quiz! Here's a summary of your personalized results.</p>
${tierBlock}
<p style="font-size:13px;font-weight:bold;color:${BRAND.primary};text-transform:uppercase;letter-spacing:0.5px;margin:24px 0 12px;">Your Top AI Opportunities</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${suggestionsList}
</table>
<p style="font-size:15px;line-height:1.6;color:${BRAND.fg};margin:24px 0 0;">Want to go deeper? Book a free 20-minute walkthrough and we'll map out what implementation looks like for your business.</p>
${ctaButton("Book Your Free Results Review")}
<p style="font-size:14px;line-height:1.6;color:${BRAND.muted};margin:0;">Cheers,<br>The OtoniqAI Team</p>`;

  return {
    subject: `${firstName}, your AI automation playbook is ready`,
    html: layout(body),
  };
}

export function buildDay3Email(
  firstName: string,
  topSuggestionTitle: string,
  path: string,
): { subject: string; html: string } {
  const suggestion = allSuggestions.find((s) => s.title === topSuggestionTitle);

  const quickStartBlock = suggestion
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
<tr><td style="background-color:${BRAND.bg};padding:16px 20px;border-radius:6px;">
  <p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${BRAND.primary};text-transform:uppercase;">Quick Start</p>
  <p style="margin:0;font-size:14px;line-height:1.6;color:${BRAND.fg};">${suggestion.quickStart}</p>
</td></tr>
</table>`
    : "";

  const toolsList = suggestion
    ? suggestion.tools
        .map(
          (t) =>
            `<li style="padding:4px 0;font-size:14px;color:${BRAND.fg};"><strong>${t.name}</strong> <span style="color:${BRAND.muted};">(${t.note})</span></li>`,
        )
        .join("")
    : "";

  const toolsBlock = toolsList
    ? `<p style="font-size:13px;font-weight:bold;color:${BRAND.primary};text-transform:uppercase;letter-spacing:0.5px;margin:20px 0 8px;">Recommended Tools</p>
<ul style="margin:0;padding-left:20px;">${toolsList}</ul>`
    : "";

  const learnBlock =
    suggestion?.learnHowUrl
      ? `<p style="margin:20px 0 0;"><a href="${suggestion.learnHowUrl}" target="_blank" style="color:${BRAND.primary};font-size:14px;font-weight:600;text-decoration:underline;">${suggestion.learnHowLabel || "Learn how to set this up"} &rarr;</a></p>`
      : "";

  const pathMessage =
    path === "support"
      ? "Many businesses save 15-25 hours per month by automating their first support workflow. The key is starting small and iterating."
      : path === "sales"
        ? "Many businesses see a 20-30% improvement in lead conversion after automating their first sales workflow. The key is starting small."
        : "Whether it's support or sales, businesses that automate one workflow first see the fastest results. Start with your biggest time sink.";

  const body = `
<p style="font-size:16px;line-height:1.6;color:${BRAND.fg};margin:0 0 16px;">Hi ${firstName},</p>
<p style="font-size:15px;line-height:1.6;color:${BRAND.fg};margin:0 0 8px;">In your AI Readiness Quiz results, <strong>${topSuggestionTitle}</strong> came up as your top opportunity. Here's how to get started this week:</p>
${quickStartBlock}
${toolsBlock}
${learnBlock}
<p style="font-size:14px;line-height:1.6;color:${BRAND.muted};margin:24px 0 0;padding:16px 0;border-top:1px solid #F0F0F0;">${pathMessage}</p>
<p style="font-size:15px;line-height:1.6;color:${BRAND.fg};margin:16px 0 0;">Need help implementing? We can walk you through it in 20 minutes.</p>
${ctaButton("Book Your Free Results Review")}
<p style="font-size:14px;line-height:1.6;color:${BRAND.muted};margin:0;">Cheers,<br>The OtoniqAI Team</p>`;

  return {
    subject: `How to get started with ${topSuggestionTitle}`,
    html: layout(body),
  };
}

export function buildDay7Email(firstName: string): { subject: string; html: string } {
  const body = `
<p style="font-size:16px;line-height:1.6;color:${BRAND.fg};margin:0 0 16px;">Hi ${firstName},</p>
<p style="font-size:15px;line-height:1.6;color:${BRAND.fg};margin:0 0 20px;">It's been a week since you took our AI Readiness Quiz. Here's what we're seeing across businesses like yours:</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
<tr><td style="background-color:${BRAND.bg};padding:20px;border-radius:6px;">
  <p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${BRAND.primary};text-transform:uppercase;letter-spacing:0.5px;">By the Numbers</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:6px 0;font-size:14px;color:${BRAND.fg};line-height:1.5;">
      <strong style="color:${BRAND.primary};">73%</strong> of SMBs that implement AI automation see ROI within 60 days
    </td></tr>
    <tr><td style="padding:6px 0;font-size:14px;color:${BRAND.fg};line-height:1.5;">
      <strong style="color:${BRAND.primary};">20+ hrs/mo</strong> average time saved on repetitive tasks
    </td></tr>
    <tr><td style="padding:6px 0;font-size:14px;color:${BRAND.fg};line-height:1.5;">
      Top adopters start with <strong>just one automation</strong> and expand from there
    </td></tr>
  </table>
</td></tr>
</table>

<p style="font-size:15px;line-height:1.6;color:${BRAND.fg};margin:0 0 8px;"><strong>The pattern we see:</strong></p>
<p style="font-size:14px;line-height:1.6;color:${BRAND.fg};margin:0 0 8px;">Most businesses that take our quiz fall into one of two camps:</p>
<ol style="margin:0 0 20px;padding-left:20px;">
  <li style="padding:4px 0;font-size:14px;color:${BRAND.fg};line-height:1.5;">They bookmark their results and come back months later wishing they'd started sooner</li>
  <li style="padding:4px 0;font-size:14px;color:${BRAND.fg};line-height:1.5;">They book a quick call, get a roadmap, and start saving time within a week</li>
</ol>
<p style="font-size:15px;line-height:1.6;color:${BRAND.fg};margin:0 0 4px;">We'd love to help you be in camp 2.</p>
${ctaButton("Book Your Free 20-Min Results Review")}
<p style="font-size:14px;line-height:1.6;color:${BRAND.muted};margin:0;">No pressure, no pitch &mdash; just a walkthrough of your results and what implementation looks like.</p>
<p style="font-size:14px;line-height:1.6;color:${BRAND.muted};margin:16px 0 0;">Cheers,<br>The OtoniqAI Team</p>`;

  return {
    subject: `${firstName}, how businesses like yours are using AI`,
    html: layout(body),
  };
}
