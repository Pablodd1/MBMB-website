/**
 * Unified Brevo Transactional Email & Contact CRM Utility
 * Supports:
 * 1. Admin Lead Notification Emails (to Jasmel@medicalbillingmb.com & ADMIN_EMAIL)
 * 2. Branded Client Auto-Confirmation Emails (Attorney Pilot & Healthcare Provider RCM)
 * 3. Automatic Brevo CRM Contact Upsert (https://api.brevo.com/v3/contacts)
 */

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

function getAdminRecipients() {
  const primary = process.env.ADMIN_EMAIL || "jasmel@medicalbillingmb.com";
  const backup = "jasmelacosta@gmail.com";
  const emails = Array.from(new Set([primary, "jasmel@medicalbillingmb.com", backup]));
  return emails.map((email) => ({ email }));
}

export async function sendBrevoTransactional({
  to,
  subject,
  htmlContent,
  replyTo,
  senderName = "Jasmel — Medical Billing Miami Beach",
  senderEmail = process.env.BREVO_SENDER_EMAIL || "jasmel@medicalbillingmb.com",
}) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    console.warn("BREVO_API_KEY is not configured. Skipping Brevo email send.");
    return { sent: false, reason: "missing_api_key" };
  }

  try {
    const payload = {
      sender: { name: senderName, email: senderEmail },
      to: Array.isArray(to) ? to : [{ email: to }],
      subject,
      htmlContent,
      ...(replyTo ? { replyTo } : {}),
    };

    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn("Brevo SMTP API error:", res.status, errorText);
      return { sent: false, status: res.status, error: errorText };
    }

    const data = await res.json();
    return { sent: true, messageId: data?.messageId };
  } catch (error) {
    console.error("Brevo send exception:", error);
    return { sent: false, error: error.message };
  }
}

export async function syncBrevoContact({
  email,
  fullName = "",
  organization = "",
  phone = "",
  inquiryType = "general",
}) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY || !email) return { synced: false };

  try {
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: firstName || fullName,
          LASTNAME: lastName || "",
          COMPANY: organization || "",
          SMS: phone || "",
          SOURCE: `MBMB Website (${inquiryType})`,
        },
      }),
    });

    return { synced: res.ok };
  } catch (error) {
    console.warn("Brevo contact sync warning:", error.message);
    return { synced: false };
  }
}

export function buildProspectConfirmationEmail({
  fullName,
  orgName,
  inquiryType = "provider-consultation",
}) {
  const isAttorney = inquiryType === "attorney-pilot";

  if (isAttorney) {
    return {
      subject:
        "MBMB Legal Billing-Support Pilot — Inquiry Received | Medical Billing Miami Beach",
      htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>MBMB Legal Billing-Support Pilot</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background-color:#0a1628;padding:28px 32px;border-bottom:3px solid #00A8E8;">
              <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:#00A8E8;text-transform:uppercase;">
                Medical Billing Miami Beach (MBMB)
              </div>
              <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;">
                Medical Billing Clarity for Your Legal Team
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
                Hi <strong>${fullName}</strong>,
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                Thank you for contacting <strong>Medical Billing Miami Beach (MBMB)</strong> regarding our Administrative Medical Billing Organization &amp; Reconciliation Pilot for <strong>${orgName || "your legal team"}</strong>.
              </p>
              <div style="background-color:#f8fafc;border-left:4px solid #0066CC;padding:18px 20px;border-radius:8px;margin:20px 0;">
                <p style="margin:0 0 10px;font-size:14px;font-weight:bold;color:#0f172a;">
                  What We Prepare on a Scoped One-File Pilot:
                </p>
                <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.7;color:#334155;">
                  <li><strong>Source-Linked Medical Billing Chronology:</strong> Itemized bills and EOBs organized by date of service, provider, code, and exact page reference.</li>
                  <li><strong>Plain-English Code Explanations:</strong> Clear translations of CPT, ICD-10, HCPCS codes, and modifiers.</li>
                  <li><strong>Charge-to-Balance Reconciliation Table:</strong> Billed charges, contractual adjustments, payments, and stated open balances—flagging duplicate lines or missing date ranges.</li>
                </ul>
              </div>
              <p style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#475569;background-color:#fffbeb;border:1px solid #fde68a;padding:12px 16px;border-radius:8px;">
                <strong>Privacy &amp; Scope Reminder:</strong> Please do not reply to this email with unencrypted Protected Health Information (PHI) or confidential case files. We will coordinate an agreed secure transfer method during our call. Our support is administrative and focused on organizing and summarizing billing records (not legal advice, expert testimony, or opinions on medical necessity).
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#334155;">
                Jasmel from our Miami Beach coordination desk will reach out within <strong>1 business day</strong>. To speak immediately, call us at <a href="tel:+17866432099" style="color:#0066CC;font-weight:bold;text-decoration:none;">(786) 643-2099</a>.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#0066CC;border-radius:10px;padding:12px 24px;">
                    <a href="https://medicalbillingmb.com/for-attorneys" style="color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;display:inline-block;">
                      Review Pilot Workflow on Website →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0f172a;padding:20px 32px;color:#94a3b8;font-size:12px;line-height:1.6;">
              <strong style="color:#ffffff;">Medical Billing Miami Beach (MBMB)</strong><br/>
              Miami Beach, FL 33139 · (786) 643-2099 · <a href="mailto:Jasmel@medicalbillingmb.com" style="color:#00A8E8;text-decoration:none;">Jasmel@medicalbillingmb.com</a><br/>
              Mon–Fri: 9:00 AM – 6:00 PM EST (America/New_York)
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    };
  }

  return {
    subject:
      "Your MBMB Revenue Cycle Consultation Request — Medical Billing Miami Beach",
    htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>MBMB Provider Consultation</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background-color:#0a1628;padding:28px 32px;border-bottom:3px solid #00A8E8;">
              <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:#00A8E8;text-transform:uppercase;">
                Medical Billing Miami Beach (MBMB)
              </div>
              <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;">
                Human AAPC-Certified Expertise + AI Double-Check
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
                Hi <strong>${fullName}</strong>,
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                Thank you for contacting <strong>Medical Billing Miami Beach (MBMB)</strong> regarding revenue cycle management, medical coding, or credentialing for <strong>${orgName || "your practice"}</strong>.
              </p>
              <div style="background-color:#f8fafc;border-left:4px solid #0066CC;padding:18px 20px;border-radius:8px;margin:20px 0;">
                <p style="margin:0 0 10px;font-size:14px;font-weight:bold;color:#0f172a;">
                  How We Support Your Practice:
                </p>
                <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.7;color:#334155;">
                  <li><strong>Human Review + AI Double-Check:</strong> Experienced U.S. AAPC-certified coders verify chart documentation first, followed by an AI pre-submission check for modifiers, NCCI edits, and LCD/NCD rules.</li>
                  <li><strong>Aligned Collection Pricing (5.6%–10%):</strong> $0 setup fee for standard EHR onboarding. Final rate is confirmed in a written proposal based on monthly claim volume and specialty mix.</li>
                  <li><strong>24–48 Hour Turnaround:</strong> Daily EDI claim submission, ERA payment posting, and proactive denial appeals.</li>
                </ul>
              </div>
              <p style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#475569;background-color:#fffbeb;border:1px solid #fde68a;padding:12px 16px;border-radius:8px;">
                <strong>HIPAA &amp; Privacy Reminder:</strong> Please do not send patient names, dates of birth, or Protected Health Information (PHI) via unencrypted email. All protected records are exchanged only after a Business Associate Agreement (BAA) and encrypted channel are established.
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#334155;">
                Jasmel from our Miami Beach coordination desk will contact you within <strong>1 business day</strong>. Want to talk right now? Call us directly at <a href="tel:+17866432099" style="color:#0066CC;font-weight:bold;text-decoration:none;">(786) 643-2099</a>.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#0066CC;border-radius:10px;padding:12px 24px;">
                    <a href="https://medicalbillingmb.com/for-providers" style="color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;display:inline-block;">
                      Explore Provider Services &amp; Pricing Tiers →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0f172a;padding:20px 32px;color:#94a3b8;font-size:12px;line-height:1.6;">
              <strong style="color:#ffffff;">Medical Billing Miami Beach (MBMB)</strong><br/>
              Miami Beach, FL 33139 · (786) 643-2099 · <a href="mailto:Jasmel@medicalbillingmb.com" style="color:#00A8E8;text-decoration:none;">Jasmel@medicalbillingmb.com</a><br/>
              Mon–Fri: 9:00 AM – 6:00 PM EST (America/New_York)
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}

/**
 * Backwards-compatible helper used by /my-api/billing and /my-api/agreement
 */
export async function sendEmailNotification(subject, html) {
  return sendBrevoTransactional({
    to: getAdminRecipients(),
    subject,
    htmlContent: html,
  });
}

export { getAdminRecipients };
