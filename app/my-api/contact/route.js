import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  syncBrevoContact,
  buildProspectConfirmationEmail,
  getAdminRecipients,
  isBotOrSpamSubmission,
} from "@UTILS/email";

export async function POST(req) {
  try {
    const query = await req.json();

    // Validate required fields (message is optional on /contact)
    if (!query.fullName || !query.email) {
      return NextResponse.json(
        {
          message: "Missing required fields: fullName and email",
        },
        { status: 400 }
      );
    }

    const orgName = query.practiceName || query.firmName || "";

    // Block automated spam/bot crawlers silently before burning Brevo credits or alerting admin
    const spamCheck = isBotOrSpamSubmission({
      fullName: query.fullName,
      email: query.email,
      orgName,
      message: query.message || "",
      honeypot: query.website || query.companyWebsite || "",
      formLoadedAt: query.formLoadedAt || 0,
    });
    if (spamCheck.isSpam) {
      console.warn("Blocked bot/spam contact submission:", spamCheck.reason, query.email, query.fullName);
      return NextResponse.json({ message: "Success", filtered: true }, { status: 200 });
    }

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">
        <h2 style="color:#0a1628;margin-top:0;">New Contact Form Submission - MBMB Website</h2>
        <p><strong>Name:</strong> ${query.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${query.email}">${query.email}</a></p>
        <p><strong>Practice / Organization Name:</strong> ${orgName || "N/A"}</p>
        ${query.phone ? `<p><strong>Phone:</strong> <a href="tel:${query.phone}">${query.phone}</a></p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="background:#f8fafc;padding:12px;border-radius:8px;">${query.message || "(No additional message provided)"}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
        <p style="font-size:12px;color:#64748b;"><em>Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST/EDT</em></p>
      </div>
    `;
    const subject = `📩 MBMB Contact: ${query.fullName} (${orgName || "General Inquiry"})`;

    // 1. Send Admin Alert via Brevo
    const adminResult = await sendBrevoTransactional({
      to: getAdminRecipients(),
      subject,
      htmlContent: adminHtml,
      replyTo: { email: query.email, name: query.fullName },
    });

    // 2. Send Branded Confirmation Email to Visitor via Brevo
    const confirmation = buildProspectConfirmationEmail({
      fullName: query.fullName,
      orgName,
      inquiryType: query.inquiryType || "provider-consultation",
    });

    const prospectResult = await sendBrevoTransactional({
      to: [{ email: query.email, name: query.fullName }],
      subject: confirmation.subject,
      htmlContent: confirmation.htmlContent,
      replyTo: { email: "Jasmel@medicalbillingmb.com", name: "Jasmel — MBMB" },
    });

    // 3. Upsert Contact into Brevo CRM
    await syncBrevoContact({
      email: query.email,
      fullName: query.fullName,
      organization: orgName,
      phone: query.phone || "",
      inquiryType: "Contact Form",
    });

    return NextResponse.json(
      {
        message: "Success",
        emailSent: adminResult.sent,
        confirmationSent: prospectResult.sent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
