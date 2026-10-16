import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  syncBrevoContact,
  buildProspectConfirmationEmail,
  getAdminRecipients,
} from "@UTILS/email";

export async function POST(req) {
  try {
    const query = await req.json();
    const orgName = query.practiceName || query.firmName;

    // Validate required fields
    if (!query.fullName || !query.email || !orgName) {
      return NextResponse.json(
        {
          message: "Missing required fields: fullName, email, practiceName/firmName",
        },
        { status: 400 }
      );
    }

    const isAttorneyPilot = query.inquiryType === "attorney-pilot";
    const heading = isAttorneyPilot
      ? "New Attorney Billing-Support Pilot Inquiry - MBMB"
      : "New Provider Consultation / Audit Submission - MBMB";

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">
        <h2 style="color:#0a1628;margin-top:0;">${heading}</h2>
        <p><strong>Name:</strong> ${query.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${query.email}">${query.email}</a></p>
        <p><strong>${isAttorneyPilot ? "Law Firm" : "Practice Name"}:</strong> ${orgName}</p>
        ${query.phone ? `<p><strong>Phone:</strong> <a href="tel:${query.phone}">${query.phone}</a></p>` : ""}
        ${query.serviceInterest ? `<p><strong>Service Interest:</strong> ${query.serviceInterest}</p>` : ""}
        <p><strong>Details / Message:</strong></p>
        <p style="background:#f8fafc;padding:12px;border-radius:8px;">${query.message || "(None)"}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
        <p style="font-size:12px;color:#64748b;"><em>Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST/EDT</em></p>
      </div>
    `;

    const adminSubject = isAttorneyPilot
      ? `⚖️ MBMB Attorney Pilot Inquiry: ${query.fullName} (${orgName})`
      : `🩺 MBMB Provider Consultation: ${query.fullName} (${orgName})`;

    // 1. Send Admin Alert via Brevo
    const adminResult = await sendBrevoTransactional({
      to: getAdminRecipients(),
      subject: adminSubject,
      htmlContent: adminHtml,
      replyTo: { email: query.email, name: query.fullName },
    });

    // 2. Send Branded Confirmation Email to Prospect via Brevo
    const confirmation = buildProspectConfirmationEmail({
      fullName: query.fullName,
      orgName,
      inquiryType: isAttorneyPilot ? "attorney-pilot" : "provider-consultation",
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
      inquiryType: isAttorneyPilot ? "Attorney Pilot" : "Provider Consultation",
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
    console.error("Consultation API error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
