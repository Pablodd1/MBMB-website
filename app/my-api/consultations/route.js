import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "jasmelacosta@gmail.com";

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

    const html = `
      <h2>${heading}</h2>
      <p><strong>Name:</strong> ${query.fullName}</p>
      <p><strong>Email:</strong> ${query.email}</p>
      <p><strong>${isAttorneyPilot ? "Law Firm" : "Practice Name"}:</strong> ${orgName}</p>
      ${query.phone ? `<p><strong>Phone:</strong> ${query.phone}</p>` : ""}
      ${query.serviceInterest ? `<p><strong>Service Interest:</strong> ${query.serviceInterest}</p>` : ""}
      <p><strong>Details / Message:</strong> ${query.message || "(None)"}</p>
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST/EDT</em></p>
    `;
    const subject = isAttorneyPilot
      ? `MBMB Attorney Pilot Inquiry: ${query.fullName} (${orgName})`
      : `MBMB Consultation: ${query.fullName} (${orgName})`;

    let emailSent = false;
    if (BREVO_API_KEY) {
      try {
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: { name: "MBMB Website", email: "Jasmel@medicalbillingmb.com" },
            to: [{ email: ADMIN_EMAIL }],
            subject,
            htmlContent: html,
            replyTo: { email: query.email, name: query.fullName },
          }),
        });
        emailSent = true;
      } catch (e) {
        console.warn("Brevo consultation email failed:", e.message);
      }
    } else {
      console.warn("BREVO_API_KEY not set, consultation email logged");
    }

    return NextResponse.json(
      {
        message: "Success",
        emailSent,
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
