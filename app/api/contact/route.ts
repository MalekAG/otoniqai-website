import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Lazy initialization to avoid build-time errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  message: z.string().min(1, "Message is required").max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, message } = result.data;
    const resend = getResend();

    // Send notification email to Otoniq AI
    await resend.emails.send({
      from: "Otoniq AI <noreply@otoniqai.com>",
      to: ["malek@otoniqai.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2D2D2D; max-width: 600px; margin: 0 auto; padding: 20px; background: #FAF8F5;">
            <div style="background: #0D5E6B; padding: 30px; border-radius: 12px 12px 0 0;">
              <img src="https://otoniqai.com/OtoniqAILogo.svg" alt="Otoniq AI" width="56" height="56" style="display: block; margin-bottom: 16px;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <div style="width: 40px; height: 3px; background: #D4A574; border-radius: 2px; margin-top: 12px;"></div>
            </div>

            <div style="background: #FFFFFF; padding: 30px; border: 1px solid #F0EDEA; border-top: none; border-radius: 0 0 12px 12px;">
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #8A8A8A; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                <p style="margin: 0; font-size: 16px; font-weight: 500; color: #2D2D2D;">${escapeHtml(name)}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #8A8A8A; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                <p style="margin: 0; font-size: 16px;"><a href="mailto:${escapeHtml(email)}" style="color: #0D5E6B; text-decoration: none;">${escapeHtml(email)}</a></p>
              </div>

              ${company ? `
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #8A8A8A; text-transform: uppercase; letter-spacing: 0.5px;">Company</p>
                <p style="margin: 0; font-size: 16px; color: #2D2D2D;">${escapeHtml(company)}</p>
              </div>
              ` : ''}

              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #8A8A8A; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                <div style="background: #FAF8F5; padding: 15px; border-radius: 8px; border-left: 3px solid #D4A574;">
                  <p style="margin: 0; white-space: pre-wrap; color: #2D2D2D;">${escapeHtml(message)}</p>
                </div>
              </div>

              <hr style="border: none; border-top: 1px solid #F0EDEA; margin: 25px 0;">

              <p style="font-size: 12px; color: #8A8A8A; margin: 0;">
                Reply directly to this email to respond to ${escapeHtml(name)}.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Otoniq AI <noreply@otoniqai.com>",
      to: [email],
      subject: `We got your message, ${name} — here's what's next`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2D2D2D; max-width: 600px; margin: 0 auto; padding: 20px; background: #FAF8F5;">
            <div style="background: #0D5E6B; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <img src="https://otoniqai.com/OtoniqAILogo.svg" alt="Otoniq AI" width="56" height="56" style="display: block; margin: 0 auto 16px;">
              <h1 style="color: white; margin: 0; font-size: 24px;">We got your message!</h1>
              <div style="width: 40px; height: 3px; background: #D4A574; border-radius: 2px; margin: 12px auto 0;"></div>
            </div>

            <div style="background: #FFFFFF; padding: 30px; border: 1px solid #F0EDEA; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; margin: 0 0 20px 0; color: #2D2D2D;">Hi ${escapeHtml(name)},</p>

              <p style="margin: 0 0 24px 0; color: #5A5A5A;">Thanks for reaching out to Otoniq AI. We're on it.</p>

              <p style="margin: 0 0 12px 0; font-weight: 600; color: #0D5E6B;">Here's what happens next:</p>
              <table style="margin: 0 0 24px 0; border-collapse: collapse; width: 100%;">
                <tr>
                  <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #D4A574; font-weight: 700; font-size: 15px;">1.</td>
                  <td style="padding: 8px 0; color: #5A5A5A;">We review your message and understand your needs</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #D4A574; font-weight: 700; font-size: 15px;">2.</td>
                  <td style="padding: 8px 0; color: #5A5A5A;">A team member reaches out to you personally</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #D4A574; font-weight: 700; font-size: 15px;">3.</td>
                  <td style="padding: 8px 0; color: #5A5A5A;">We schedule a free discovery call to map out your automation opportunities</td>
                </tr>
              </table>

              <div style="text-align: center; margin: 28px 0;">
                <a href="https://calendly.com/malek-otoniqai/discovery-call" target="_blank" style="display: inline-block; background: #D4A574; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">Skip the wait — book your call now</a>
              </div>

              <div style="background: #FAF8F5; padding: 16px 20px; border-radius: 8px; border-left: 3px solid #D4A574; margin: 24px 0;">
                <p style="margin: 0; font-style: italic; color: #8A8A8A; font-size: 13px;">Your message:</p>
                <p style="margin: 8px 0 0 0; white-space: pre-wrap; color: #2D2D2D; font-size: 14px;">${escapeHtml(message)}</p>
              </div>

              <p style="margin: 24px 0 0 0; color: #5A5A5A; font-size: 13px;">We've helped businesses automate hours of manual work — and we'd love to do the same for you.</p>

              <p style="margin: 20px 0 0 0; color: #2D2D2D;">Talk soon,<br><strong>Malek — Otoniq AI</strong></p>

              <hr style="border: none; border-top: 1px solid #F0EDEA; margin: 25px 0;">

              <p style="font-size: 12px; color: #8A8A8A; margin: 0; text-align: center;">
                Automate. Elevate. Dominate.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
