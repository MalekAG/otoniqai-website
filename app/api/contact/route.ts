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
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>

            <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                <p style="margin: 0; font-size: 16px; font-weight: 500;">${escapeHtml(name)}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                <p style="margin: 0; font-size: 16px;"><a href="mailto:${escapeHtml(email)}" style="color: #3B82F6;">${escapeHtml(email)}</a></p>
              </div>

              ${company ? `
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Company</p>
                <p style="margin: 0; font-size: 16px;">${escapeHtml(company)}</p>
              </div>
              ` : ''}

              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
                </div>
              </div>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">

              <p style="font-size: 12px; color: #64748b; margin: 0;">
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
      subject: "Thanks for reaching out to Otoniq AI!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
            </div>

            <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${escapeHtml(name)},</p>

              <p style="margin: 0 0 20px 0;">We've received your message and appreciate you taking the time to reach out to Otoniq AI.</p>

              <p style="margin: 0 0 20px 0;">Our team will review your inquiry and get back to you within <strong>24 hours</strong>.</p>

              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3B82F6; margin: 25px 0;">
                <p style="margin: 0; font-style: italic; color: #64748b;">Your message:</p>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>

              <p style="margin: 0 0 10px 0;">In the meantime, if you have any urgent questions, feel free to reply to this email.</p>

              <p style="margin: 25px 0 0 0;">Best regards,<br><strong>The Otoniq AI Team</strong></p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;">

              <p style="font-size: 12px; color: #64748b; margin: 0; text-align: center;">
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
