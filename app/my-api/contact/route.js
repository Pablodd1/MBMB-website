import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "jasmelacosta@gmail.com";

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

    const html = `
      <h2>New Contact Form Submission - MBMB Website</h2>
      <p><strong>Name:</strong> ${query.fullName}</p>
      <p><strong>Email:</strong> ${query.email}</p>
      <p><strong>Practice / Organization Name:</strong> ${query.practiceName || query.firmName || "N/A"}</p>
      ${query.phone ? `<p><strong>Phone:</strong> ${query.phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${query.message || "(No additional message provided)"}</p>
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST/EDT</em></p>
    `;
    const subject = `MBMB Contact: ${query.fullName} (${query.practiceName || query.firmName || "Inquiry"})`;

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
        console.warn("Brevo contact email failed:", e.message);
      }
    } else {
      console.warn("BREVO_API_KEY not set, contact email logged");
    }

    return NextResponse.json(
      {
        message: "Success",
        emailSent,
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
