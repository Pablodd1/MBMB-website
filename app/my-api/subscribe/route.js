import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  syncBrevoContact,
  getAdminRecipients,
} from "@UTILS/email";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (typeof body === "string" ? body : body.email || "").trim();
    const offerType = typeof body === "object" ? body.offerType || "provider-20-claim" : "provider-20-claim";
    const sourcePage = typeof body === "object" ? body.sourcePage || "/" : "/";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const isAttorney = offerType.includes("attorney");

    // 1. Sync into Brevo CRM
    await syncBrevoContact({
      email,
      fullName: "",
      organization: "",
      phone: "",
      inquiryType: isAttorney ? "Attorney Sample Chronology Request" : "20-Claim Free Audit Request",
    });

    // 2. Send immediate, authentic human-written email with the requested deliverable
    const subject = isAttorney
      ? "Redacted Sample Medical Bill Chronology + 72-Hr Pilot Info — Jasmel (MBMB)"
      : "Your 20-Claim Free Audit & 2026 Rate Sheet — Jasmel (MBMB)";

    const htmlContent = isAttorney
      ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; line-height: 1.6; font-size: 14px;">
          <p>Hi there,</p>
          <p>Thanks for requesting our <strong>Sample Medical Billing Chronology &amp; EOB Reconciliation</strong> format.</p>
          <p>Below is the exact administrative layout our U.S. AAPC-certified coders deliver in <strong>editable Excel/CSV + Bates-linked PDF</strong> within 72 hours for a single Personal Injury or litigation pilot file:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background: #0a1628; color: #ffffff; text-align: left;">
                <th style="padding: 8px; border: 1px solid #334155;">DOS / Provider</th>
                <th style="padding: 8px; border: 1px solid #334155;">Bates Ref</th>
                <th style="padding: 8px; border: 1px solid #334155;">CPT / Plain-English</th>
                <th style="padding: 8px; border: 1px solid #334155;">Billed</th>
                <th style="padding: 8px; border: 1px solid #334155;">PIP/EOB Paid &amp; Adj</th>
                <th style="padding: 8px; border: 1px solid #334155;">Net Bal</th>
                <th style="padding: 8px; border: 1px solid #334155;">Coder Flag</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">02/14/26 · Imaging Ctr</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">Bates 0042</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">72148 — Lumbar MRI w/o contrast</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">$1,850</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">$420 paid / $980 adj</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">$450</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; color: #0369a1;">Matches EOB #402</td>
              </tr>
              <tr style="background: #fff1f2;">
                <td style="padding: 8px; border: 1px solid #cbd5e1;">02/14/26 · Imaging Ctr</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">Bates 0089</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">72148 — Lumbar MRI w/o contrast</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">$1,850</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">$0 / $0</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">$1,850</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; color: #be123c; font-weight: bold;">DUPLICATE: Global charge billed twice without -26/-TC split</td>
              </tr>
            </tbody>
          </table>
          <p><strong>Want to test us on 1 messy case file?</strong><br/>
          Just reply to this email with the approximate page count (do not attach PHI yet—we'll send a secure encrypted upload link and sign your NDA/BAA first).</p>
          <p style="margin-top: 22px;">
            Best,<br/>
            <strong>Jasmel Acosta</strong><br/>
            Medical Billing Miami Beach (MBMB)<br/>
            Direct: <a href="tel:+17866432099" style="color: #0066CC;">(786) 643-2099</a> · <a href="https://medicalbillingmb.com/for-attorneys" style="color: #0066CC;">medicalbillingmb.com/for-attorneys</a>
          </p>
        </div>
      `
      : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #0f172a; line-height: 1.6; font-size: 14px;">
          <p>Hi there,</p>
          <p>Here is how our <strong>Free 48-Hour 20-Claim Audit</strong> works—no sales fluff, just the numbers:</p>
          <ol style="padding-left: 20px; color: #1e293b;">
            <li style="margin-bottom: 8px;"><strong>Pick 20 recent denied or underpaid claims</strong> (CO-16, CO-50, CO-97, Modifier 25/59 rejections, or aging 60+ day AR).</li>
            <li style="margin-bottom: 8px;"><strong>We sign your HIPAA BAA</strong> and either review via temporary read-only EHR access or a secure encrypted EOB upload.</li>
            <li style="margin-bottom: 8px;"><strong>Within 48 hours</strong>, our U.S. AAPC-certified coders hand you a line-by-line sheet showing the exact CPT/ICD-10/modifier fix and the exact dollar amount still collectable.</li>
          </ol>
          <div style="background: #f8fafc; border-left: 4px solid #0066CC; padding: 14px 18px; border-radius: 6px; margin: 18px 0;">
            <strong>If you hire us afterwards:</strong> You pay <strong>5.6%–10% of what actually hits your bank account</strong>. $0 setup fee. No long-term lock-in. Keep your current EHR.
          </div>
          <p><strong>Want to run the 20-claim test this week?</strong><br/>
          Just reply to this email with your specialty and which EHR you use, or call me directly at <a href="tel:+17866432099" style="color: #0066CC; font-weight: bold;">(786) 643-2099</a>.</p>
          <p style="margin-top: 22px;">
            Best,<br/>
            <strong>Jasmel Acosta</strong><br/>
            Medical Billing Miami Beach (MBMB)<br/>
            Direct: <a href="tel:+17866432099" style="color: #0066CC;">(786) 643-2099</a> · <a href="https://medicalbillingmb.com/for-providers" style="color: #0066CC;">medicalbillingmb.com/for-providers</a>
          </p>
        </div>
      `;

    await sendBrevoTransactional({
      to: [{ email }],
      subject,
      htmlContent,
      replyTo: { email: "Jasmel@medicalbillingmb.com", name: "Jasmel Acosta — MBMB" },
    });

    // 3. Alert Jasmel
    await sendBrevoTransactional({
      to: getAdminRecipients(),
      subject: `🔥 Instant Offer Lead (${isAttorney ? "Attorney Chronology" : "20-Claim Audit"}): ${email}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h3 style="margin-top: 0;">New Instant Offer Lead Captured</h3>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Offer Requested:</strong> ${isAttorney ? "Attorney Redacted Sample Chronology" : "Provider 20-Claim Free Audit"}</p>
          <p><strong>Page:</strong> ${sourcePage}</p>
        </div>
      `,
      replyTo: { email },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
