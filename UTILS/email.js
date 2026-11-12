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

export function buildFiveOptionConnectHubHtml({
  audience = "provider",
  email = "",
} = {}) {
  const safeAudience = audience === "attorney" ? "attorney" : "provider";
  const emailParam = email ? `&amp;email=${encodeURIComponent(email)}` : "";
  return `
    <div style="margin:18px 0;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 14px 18px;text-align:center;">
      <div style="font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:12px;">
        Skip the back-and-forth — pick whichever is easiest for you:
      </div>

      <!-- ROW 1: Phone Call Pair -->
      <div style="font-size:0;line-height:0;">
        <div style="display:inline-block;vertical-align:top;width:220px;max-width:100%;margin:4px;box-sizing:border-box;">
          <a href="https://medicalbillingmb.com/call-me?mode=call&amp;audience=${safeAudience}${emailParam}" style="display:block;background-color:#0066CC;border:1.5px solid #0066CC;border-radius:10px;padding:11px 12px;text-decoration:none;text-align:center;box-sizing:border-box;">
            <span style="display:block;font-size:14px;font-weight:800;color:#ffffff;line-height:1.25;">&#128222; You Call Me &rarr;</span>
            <span style="display:block;font-size:11px;font-weight:500;color:#dbeafe;line-height:1.3;margin-top:3px;">Drop your name &amp; number</span>
          </a>
        </div>
        <div style="display:inline-block;vertical-align:top;width:220px;max-width:100%;margin:4px;box-sizing:border-box;">
          <a href="tel:+17866432099" style="display:block;background-color:#0a1628;border:1.5px solid #0a1628;border-radius:10px;padding:11px 12px;text-decoration:none;text-align:center;box-sizing:border-box;">
            <span style="display:block;font-size:14px;font-weight:800;color:#ffffff;line-height:1.25;">&#128242; I’ll Call You</span>
            <span style="display:block;font-size:11px;font-weight:600;color:#38bdf8;line-height:1.3;margin-top:3px;">Tap to dial (786) 643-2099</span>
          </a>
        </div>
      </div>

      <!-- ROW 2: SMS / Text Pair -->
      <div style="font-size:0;line-height:0;">
        <div style="display:inline-block;vertical-align:top;width:220px;max-width:100%;margin:4px;box-sizing:border-box;">
          <a href="https://medicalbillingmb.com/call-me?mode=text&amp;audience=${safeAudience}${emailParam}" style="display:block;background-color:#ffffff;border:1.5px solid #0066CC;border-radius:10px;padding:10px 12px;text-decoration:none;text-align:center;box-sizing:border-box;">
            <span style="display:block;font-size:14px;font-weight:800;color:#0066CC;line-height:1.25;">&#128172; You Text Me &rarr;</span>
            <span style="display:block;font-size:11px;font-weight:500;color:#475569;line-height:1.3;margin-top:3px;">Leave your cell for a quick text</span>
          </a>
        </div>
        <div style="display:inline-block;vertical-align:top;width:220px;max-width:100%;margin:4px;box-sizing:border-box;">
          <a href="https://medicalbillingmb.com/call-me?mode=open-sms&amp;audience=${safeAudience}${emailParam}" style="display:block;background-color:#ffffff;border:1.5px solid #0f172a;border-radius:10px;padding:10px 12px;text-decoration:none;text-align:center;box-sizing:border-box;">
            <span style="display:block;font-size:14px;font-weight:800;color:#0f172a;line-height:1.25;">&#9993;&#65039; I’ll Text You</span>
            <span style="display:block;font-size:11px;font-weight:500;color:#475569;line-height:1.3;margin-top:3px;">Text (786) 643-2099 right now</span>
          </a>
        </div>
      </div>

      <!-- ROW 3: 5th Option — Slim Full-Span Virtual Consultation Bar -->
      <div style="display:inline-block;width:448px;max-width:100%;margin:6px auto 0;box-sizing:border-box;">
        <a href="https://medicalbillingmb.com/call-me?mode=virtual&amp;audience=${safeAudience}${emailParam}" style="display:block;background-color:#eff6ff;border:1px solid #93c5fd;border-radius:10px;padding:10px 14px;text-decoration:none;text-align:center;box-sizing:border-box;">
          <span style="display:block;font-size:13px;font-weight:800;color:#0369a1;line-height:1.3;">&#128467;&#65039; Make an Appointment — Free 15-Min Virtual Consultation &rarr;</span>
          <span style="display:block;font-size:11px;font-weight:500;color:#475569;line-height:1.3;margin-top:2px;">Pick a day &amp; time on your calendar · Video or Phone</span>
        </a>
      </div>
    </div>
  `;
}

export async function scheduleDay3FollowUpEmail({
  email,
  fullName = "",
  orgName = "",
  isAttorney = false,
}) {
  if (process.env.EMAIL_CAMPAIGNS_PAUSED !== "false") {
    return { sent: false, paused: true };
  }
  if (!email) return { sent: false };
  const firstName = String(fullName || "").trim().split(/\s+/)[0] || "";
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const scheduledAt = new Date(Date.now() + 70 * 60 * 60 * 1000).toISOString();
  const hubHtml = buildFiveOptionConnectHubHtml({
    audience: isAttorney ? "attorney" : "provider",
    email,
  });

  const subject = isAttorney
    ? orgName
      ? `Quick follow-up — ${orgName} medical bill chronology pilot`
      : "Quick follow-up — 1-case billing chronology pilot"
    : orgName
      ? `Quick follow-up — 20 denied claims test for ${orgName}`
      : "Quick follow-up — 20 denied claims test";

  const htmlContent = isAttorney
    ? `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;font-size:15px;line-height:1.65;">
        <p>${greeting}</p>
        <p>Checking in quickly on the sample Bates-linked chronology table I sent over a couple days ago. If your team has an active Personal Injury or litigation demand file with messy hospital UB-04s, CMS-1500s, and EOBs, we can turn it around in <strong>72 hours</strong>.</p>
        ${hubHtml}
        <p>Or simply reply with the approximate page count and I’ll send over our encrypted upload link + NDA/BAA right away.</p>
        <p style="margin-top:18px;font-size:14px;color:#0f172a;">Best,<br/><strong>Jasmel Acosta</strong><br/>Medical Billing Miami Beach<br/>(786) 643-2099</p>
      </div>`
    : `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;font-size:15px;line-height:1.65;">
        <p>${greeting}</p>
        <p>Checking in quickly on the <strong>20-Claim Free Audit</strong> note I sent over a couple days ago. If you have 20 recent CO-16, CO-50, CO-97, or Modifier 25/59 rejections sitting in your EHR, our U.S. AAPC coders will show you the exact collectable dollar amount in <strong>48 hours—free</strong>.</p>
        ${hubHtml}
        <p>Or just reply with which EHR you use and I’ll send over our standard HIPAA BAA to get started.</p>
        <p style="margin-top:18px;font-size:14px;color:#0f172a;">Best,<br/><strong>Jasmel Acosta</strong><br/>Medical Billing Miami Beach<br/>(786) 643-2099</p>
      </div>`;

  const textContent = isAttorney
    ? `${greeting}\n\nChecking in quickly on the sample Bates-linked chronology table I sent over a couple days ago. If your team has an active Personal Injury or litigation demand file with messy hospital UB-04s, CMS-1500s, and EOBs, reply with the approximate page count or connect directly at https://medicalbillingmb.com/call-me?audience=attorney or (786) 643-2099.\n\nBest,\nJasmel Acosta\nMedical Billing Miami Beach`
    : `${greeting}\n\nChecking in quickly on the 20-Claim Free Audit instructions I sent over a couple days ago. If you have 20 recent CO-16, CO-50, or Modifier 25/59 rejections in your EHR, reply with your EHR or connect directly at https://medicalbillingmb.com/call-me?audience=provider or (786) 643-2099.\n\nBest,\nJasmel Acosta\nMedical Billing Miami Beach`;

  return sendBrevoTransactional({
    to: [{ email, ...(fullName ? { name: fullName } : {}) }],
    subject,
    htmlContent,
    textContent,
    scheduledAt,
    tags: ["mbmb-day3-followup"],
    replyTo: { email: "Jasmel@medicalbillingmb.com", name: "Jasmel Acosta" },
  });
}

export function buildDay7CaseStudyEmail({
  fullName = "",
  orgName = "",
  email = "",
  isAttorney = false,
}) {
  const firstName = String(fullName || "").trim().split(/\s+/)[0] || "";
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const hubHtml = buildFiveOptionConnectHubHtml({
    audience: isAttorney ? "attorney" : "provider",
    email,
  });

  if (isAttorney) {
    return {
      subject: "Last note — catching duplicate CPT charges before mediation",
      htmlContent: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;font-size:15px;line-height:1.65;">
        <p>${greeting}</p>
        <p>One quick real-world example before I close your file: on Personal Injury billing packets we audit in South Florida, one of the most common defense attacks is an imaging center or hospital billing a global CPT code twice without a <code>-26/-TC</code> split, or leaving PIP/contractual EOB adjustments unreconciled.</p>
        ${hubHtml}
        <p>Our U.S. AAPC coders catch those before your demand goes out and hand you an editable Excel + Bates-linked PDF table in 72 hours. Whenever a messy file lands on your desk, tap any option above or reply here.</p>
        <p style="margin-top:18px;font-size:14px;color:#0f172a;">Best,<br/><strong>Jasmel Acosta</strong><br/>Medical Billing Miami Beach · (786) 643-2099</p>
      </div>`,
      textContent: `${greeting}\n\nOne quick real-world example before I close your file: on Personal Injury billing packets we audit in South Florida, one of the most common defense attacks is an imaging center or hospital billing a global CPT code twice without a -26/-TC split, or leaving PIP/contractual EOB adjustments unreconciled.\n\nConnect anytime at https://medicalbillingmb.com/call-me?audience=attorney or call/text (786) 643-2099.\n\nBest,\nJasmel Acosta\nMedical Billing Miami Beach`,
    };
  }

  return {
    subject: orgName
      ? `90-day Miami Beach benchmark for ${orgName} (18% to 2.4% denials)`
      : "Last note — how a 4-provider Miami practice cut denials from 18% to 2.4%",
    htmlContent: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;font-size:15px;line-height:1.65;">
      <p>${greeting}</p>
      <p>One quick benchmark before I close my notes: a 4-provider Miami Beach practice came to us with an <strong>18.0% claim denial rate</strong> from modifier and bundling rejections. Working directly inside their existing EHR ($0 migration cost), our U.S. AAPC coders + AI pre-submission check dropped their denial rate to <strong>2.4%</strong> and added <strong>+$142,000</strong> in annualized net collections within 90 days.</p>
      ${hubHtml}
      <p>Remember—we only charge <strong>5.6%–10% of what actually hits your bank account</strong>, and our 48-hour 20-claim proof test is completely free.</p>
      <p style="margin-top:18px;font-size:14px;color:#0f172a;">Best,<br/><strong>Jasmel Acosta</strong><br/>Medical Billing Miami Beach · (786) 643-2099</p>
    </div>`,
    textContent: `${greeting}\n\nOne quick benchmark before I close my notes: a 4-provider Miami Beach practice came to us with an 18.0% claim denial rate. Working inside their existing EHR, our U.S. AAPC coders dropped denials to 2.4% (+$142,000 annualized net collections in 90 days).\n\nConnect anytime at https://medicalbillingmb.com/call-me?audience=provider or call/text (786) 643-2099.\n\nBest,\nJasmel Acosta\nMedical Billing Miami Beach`,
  };
}

export function buildProspectConfirmationEmail({
  fullName,
  orgName,
  email = "",
  inquiryType = "provider-consultation",
}) {
  const isAttorney = inquiryType === "attorney-pilot";
  const hubHtml = buildFiveOptionConnectHubHtml({
    audience: isAttorney ? "attorney" : "provider",
    email,
  });

  if (isAttorney) {
    return {
      subject:
        "Got your note — Legal Billing Chronology Pilot | Jasmel (MBMB)",
      htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>MBMB Legal Billing Pilot</title></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:26px 12px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;border-top:4px solid #0066CC;">
          <tr>
            <td style="padding:24px 28px;font-size:15px;line-height:1.65;color:#1e293b;">
              <p style="margin:0 0 14px;">Hi <strong>${fullName}</strong>,</p>
              <p style="margin:0 0 14px;">Got your inquiry for <strong>${orgName || "your legal team"}</strong>. Our U.S. AAPC-certified coders prepare source-linked medical billing chronologies, plain-English CPT/ICD-10 translations, and EOB duplicate/balance reconciliations in <strong>72 hours</strong>.</p>
              ${hubHtml}
              <p style="margin:0 0 14px;font-size:13px;color:#475569;background-color:#fffbeb;border:1px solid #fde68a;padding:10px 14px;border-radius:8px;">
                <strong>Privacy Reminder:</strong> Please do not attach unencrypted PHI to email—we will establish an NDA/BAA and encrypted upload link first.
              </p>
              <p style="margin:18px 0 0;font-size:14px;color:#0f172a;">Talk soon,<br/><strong>Jasmel Acosta</strong><br/>Medical Billing Miami Beach · (786) 643-2099</p>
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
      "Got your note — Free 48-Hr Billing Audit | Jasmel (MBMB)",
    htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>MBMB Provider Audit</title></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:26px 12px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;border-top:4px solid #0066CC;">
          <tr>
            <td style="padding:24px 28px;font-size:15px;line-height:1.65;color:#1e293b;">
              <p style="margin:0 0 14px;">Hi <strong>${fullName}</strong>,</p>
              <p style="margin:0 0 14px;">Got your inquiry for <strong>${orgName || "your practice"}</strong>. Our U.S. AAPC-certified coders + AI pre-submission check work directly inside your existing EHR ($0 setup, <strong>5.6%–10% of collected cash only</strong>).</p>
              ${hubHtml}
              <p style="margin:0 0 14px;font-size:13px;color:#475569;background-color:#fffbeb;border:1px solid #fde68a;padding:10px 14px;border-radius:8px;">
                <strong>HIPAA Reminder:</strong> Please do not send patient names or PHI via unencrypted email—all protected records are exchanged only after our BAA is signed.
              </p>
              <p style="margin:18px 0 0;font-size:14px;color:#0f172a;">Talk soon,<br/><strong>Jasmel Acosta</strong><br/>Medical Billing Miami Beach · (786) 643-2099</p>
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
