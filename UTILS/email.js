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

const DISPOSABLE_OR_TEST_DOMAINS = new Set([
  "example.com",
  "test.com",
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
]);

function looksGibberishToken(str = "") {
  const clean = String(str).replace(/[^a-zA-Z]/g, "");
  if (clean.length < 5) return false;
  const upperTransitions = (clean.slice(1).match(/[A-Z]/g) || []).length;
  if (clean.length >= 8 && upperTransitions >= 3) return true;
  if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(clean)) return true;
  if (clean.length >= 5 && !/[aeiouy]/i.test(clean)) return true;
  return false;
}

export function isBotOrSpamSubmission({
  fullName = "",
  email = "",
  orgName = "",
  message = "",
  honeypot = "",
  formLoadedAt = 0,
}) {
  if (honeypot && String(honeypot).trim().length > 0) {
    return { isSpam: true, reason: "honeypot_filled" };
  }

  if (formLoadedAt && Number(formLoadedAt) > 0) {
    const elapsedMs = Date.now() - Number(formLoadedAt);
    if (elapsedMs >= 0 && elapsedMs < 1500) {
      return { isSpam: true, reason: "submitted_too_fast" };
    }
  }

  const emailLower = String(email).trim().toLowerCase();
  const domain = emailLower.split("@")[1] || "";
  const localPart = emailLower.split("@")[0] || "";

  if (DISPOSABLE_OR_TEST_DOMAINS.has(domain)) {
    return { isSpam: true, reason: "disposable_domain" };
  }
  if ((localPart.match(/\./g) || []).length >= 4) {
    return { isSpam: true, reason: "dotted_bot_email" };
  }

  const nameWords = String(fullName).trim().split(/\s+/);
  const orgWords = String(orgName)
    .replace(/\(Law Firm Pilot\)/gi, "")
    .replace(/\b(LLC|Inc|PLLC|PA|MD|DO|Corp)\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (nameWords.some((w) => looksGibberishToken(w))) {
    return { isSpam: true, reason: "gibberish_name" };
  }
  if (orgWords.some((w) => looksGibberishToken(w))) {
    return { isSpam: true, reason: "gibberish_org" };
  }

  if (/(https?:\/\/|www\.|crypto|bitcoin|casino|viagra|seo\s+service)/i.test(String(message))) {
    return { isSpam: true, reason: "spam_keywords_or_links" };
  }

  return { isSpam: false };
}

export async function sendBrevoTransactional({
  to,
  subject,
  htmlContent,
  textContent,
  replyTo,
  scheduledAt,
  tags,
  senderName = "Jasmel Acosta",
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
      ...(htmlContent ? { htmlContent } : {}),
      ...(textContent ? { textContent } : {}),
      ...(replyTo ? { replyTo } : {}),
      ...(scheduledAt ? { scheduledAt } : {}),
      ...(Array.isArray(tags) && tags.length > 0 ? { tags } : {}),
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
    const isoDate = new Date().toISOString().slice(0, 10);

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
        listIds: [21],
        attributes: {
          ...(firstName || fullName ? { FIRSTNAME: firstName || fullName } : {}),
          ...(lastName ? { LASTNAME: lastName } : {}),
          ...(organization ? { COMPANY: organization } : {}),
          ...(phone ? { SMS: phone } : {}),
          SOURCE: `MBMB Website (${inquiryType}) | ${isoDate}`,
        },
      }),
    });

    return { synced: res.ok };
  } catch (error) {
    console.warn("Brevo contact sync warning:", error.message);
    return { synced: false };
  }
}

export async function scheduleDay3FollowUpEmail({
  email,
  fullName = "",
  orgName = "",
  isAttorney = false,
}) {
  if (!email) return { sent: false };
  const firstName = String(fullName || "").trim().split(/\s+/)[0] || "";
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  // Schedule 70 hours in the future (inside Brevo's 72-hour native SMTP scheduledAt window)
  const scheduledAt = new Date(Date.now() + 70 * 60 * 60 * 1000).toISOString();

  const subject = isAttorney
    ? orgName
      ? `Quick follow-up — ${orgName} medical bill chronology pilot`
      : "Quick follow-up — 1-case billing chronology pilot"
    : orgName
      ? `Quick follow-up — 20 denied claims test for ${orgName}`
      : "Quick follow-up — 20 denied claims test";

  const textContent = isAttorney
    ? `${greeting}

Checking in quickly on the sample Bates-linked chronology table I sent over a couple days ago. If your team has an active Personal Injury or litigation demand file with messy hospital UB-04s, CMS-1500s, and EOBs, just reply with the approximate page count and we'll send our encrypted upload link + NDA/BAA to turn it around in 72 hours.

Want to talk through a case for 10 minutes first? Call me directly at (786) 643-2099 or grab a slot at https://medicalbillingmb.com/for-attorneys

Best,
Jasmel Acosta
Medical Billing Miami Beach
(786) 643-2099`
    : `${greeting}

Checking in quickly on the 20-Claim Free Audit instructions I sent over a couple days ago. If you have 20 recent CO-16, CO-50, CO-97, or Modifier 25/59 rejections sitting in your EHR, reply with which EHR you use and I'll send over our standard HIPAA BAA so our U.S. AAPC coders can show you the exact collectable dollar amount in 48 hours.

Or if a quick 10-minute call is easier, grab a time at https://medicalbillingmb.com/consultation or call me directly at (786) 643-2099.

Best,
Jasmel Acosta
Medical Billing Miami Beach
(786) 643-2099`;

  return sendBrevoTransactional({
    to: [{ email, ...(fullName ? { name: fullName } : {}) }],
    subject,
    textContent,
    scheduledAt,
    tags: ["mbmb-day3-followup"],
    replyTo: { email: "Jasmel@medicalbillingmb.com", name: "Jasmel Acosta" },
  });
}

export function buildDay7CaseStudyEmail({
  fullName = "",
  orgName = "",
  isAttorney = false,
}) {
  const firstName = String(fullName || "").trim().split(/\s+/)[0] || "";
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  if (isAttorney) {
    return {
      subject: "Last note — catching duplicate CPT charges before mediation",
      textContent: `${greeting}

One quick real-world example before I close your file: on Personal Injury billing packets we audit in South Florida, one of the most common defense attacks is an imaging center or hospital billing a global CPT code twice without a -26/-TC split, or leaving PIP/contractual EOB adjustments unreconciled.

Our U.S. AAPC coders catch those before your demand goes out and hand you an editable Excel + Bates-linked PDF table in 72 hours.

Whenever a messy medical bill file lands on your desk, just reply here or call me at (786) 643-2099.

Best,
Jasmel Acosta
Medical Billing Miami Beach
https://medicalbillingmb.com/for-attorneys`,
    };
  }

  return {
    subject: orgName
      ? `90-day Miami Beach benchmark for ${orgName} (18% to 2.4% denials)`
      : "Last note — how a 4-provider Miami practice cut denials from 18% to 2.4%",
    textContent: `${greeting}

One quick benchmark before I close my notes: a 4-provider Miami Beach practice came to us with an 18.0% claim denial rate from modifier and bundling rejections. Working directly inside their existing EHR ($0 migration cost), our U.S. AAPC coders + AI pre-submission check dropped their denial rate to 2.4% and added +$142,000 in annualized net collections within 90 days.

Remember—we only charge 5.6%–10% of what actually hits your bank account, and our 48-hour 20-claim proof test is completely free.

Whenever you're ready to test us on 20 denied claims, just reply to this email or call me at (786) 643-2099.

Best,
Jasmel Acosta
Medical Billing Miami Beach
https://medicalbillingmb.com/for-providers`,
  };
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
