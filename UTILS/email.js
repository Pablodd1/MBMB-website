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
  attachment,
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
      ...(Array.isArray(attachment) && attachment.length > 0 ? { attachment } : {}),
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
  const connectUrl = `https://medicalbillingmb.com/call-me?audience=${
    isAttorney ? "attorney" : "provider"
  }&email=${encodeURIComponent(email)}`;

  // YC Rule 15: Casual, lowercase subject line like a colleague wrote it
  const subject = isAttorney
    ? orgName
      ? `re: ${orgName.toLowerCase()} medical bill chronology`
      : "re: sample medical bill chronology"
    : orgName
      ? `re: 20 denied claims (${orgName.toLowerCase()})`
      : "re: 20 denied claims?";

  // YC Rules 1, 2, 6, 16, 18: 2-3 plain sentences, zero chrome, standalone ask right before sign-off
  const htmlContent = isAttorney
    ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.58;color:#222222;max-width:580px;">
        <p style="margin:0 0 14px;">${greeting}</p>
        <p style="margin:0 0 14px;">Floating this back up in case your team has a Personal Injury demand or mediation packet coming up—we sign your NDA/BAA first and turn messy UB-04s, CMS-1500s, and EOBs into an editable Excel + Bates-linked PDF chronology in 72 hours.</p>
        <p style="margin:0 0 16px;">Want to reply with an approximate page count so I can send over our encrypted upload link?</p>
        <p style="margin:0;">– Jasmel<br/><span style="color:#555555;font-size:13px;">Jasmel Acosta · Medical Billing Miami Beach<br/>(786) 643-2099 · <a href="${connectUrl}" style="color:#1155cc;">call, text, or grab 15m</a></span></p>
      </div>`
    : `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.58;color:#222222;max-width:580px;">
        <p style="margin:0 0 14px;">${greeting}</p>
        <p style="margin:0 0 14px;">Floating this back up in case it got buried between patients—we sign your HIPAA BAA first and audit 20 recent CO-16, CO-50, or Modifier 25/59 rejections inside your current EHR to estimate your recoverable dollars in 48 hours, free.</p>
        <p style="margin:0 0 16px;">Want to reply with which EHR you use so we can run the 20-claim test?</p>
        <p style="margin:0;">– Jasmel<br/><span style="color:#555555;font-size:13px;">Jasmel Acosta · Medical Billing Miami Beach<br/>(786) 643-2099 · <a href="${connectUrl}" style="color:#1155cc;">call, text, or grab 15m</a></span></p>
      </div>`;

  const textContent = isAttorney
    ? `${greeting}\n\nFloating this back up in case your team has a Personal Injury demand or mediation packet coming up—we sign your NDA/BAA first and turn messy UB-04s, CMS-1500s, and EOBs into an editable Excel + Bates-linked PDF chronology in 72 hours.\n\nWant to reply with an approximate page count so I can send over our encrypted upload link?\n\n– Jasmel\nJasmel Acosta · Medical Billing Miami Beach\n(786) 643-2099 · ${connectUrl}`
    : `${greeting}\n\nFloating this back up in case it got buried between patients—we sign your HIPAA BAA first and audit 20 recent CO-16, CO-50, or Modifier 25/59 rejections inside your current EHR to estimate your recoverable dollars in 48 hours, free.\n\nWant to reply with which EHR you use so we can run the 20-claim test?\n\n– Jasmel\nJasmel Acosta · Medical Billing Miami Beach\n(786) 643-2099 · ${connectUrl}`;

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
  const connectUrl = `https://medicalbillingmb.com/call-me?audience=${
    isAttorney ? "attorney" : "provider"
  }${email ? `&email=${encodeURIComponent(email)}` : ""}`;

  if (isAttorney) {
    return {
      subject: "duplicate cpt 72148 charges",
      htmlContent: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.58;color:#222222;max-width:580px;">
        <p style="margin:0 0 14px;">${greeting}</p>
        <p style="margin:0 0 14px;">Last quick note—on a recent South Florida PI file, an imaging center billed a global lumbar MRI (CPT 72148, $1,850) twice without a -26/-TC split, and catching it before mediation kept opposing counsel from poking holes in the demand.</p>
        <p style="margin:0 0 16px;">Open to trying us on 1 messy medical bill packet next time one lands on your desk?</p>
        <p style="margin:0;">– Jasmel<br/><span style="color:#555555;font-size:13px;">Jasmel Acosta · Medical Billing Miami Beach<br/>(786) 643-2099 · <a href="${connectUrl}" style="color:#1155cc;">call, text, or grab 15m</a></span></p>
      </div>`,
      textContent: `${greeting}\n\nLast quick note—on a recent South Florida PI file, an imaging center billed a global lumbar MRI (CPT 72148, $1,850) twice without a -26/-TC split, and catching it before mediation kept opposing counsel from poking holes in the demand.\n\nOpen to trying us on 1 messy medical bill packet next time one lands on your desk?\n\n– Jasmel\nJasmel Acosta · Medical Billing Miami Beach\n(786) 643-2099 · ${connectUrl}`,
    };
  }

  return {
    subject: orgName
      ? `20 denied claims scenario (${orgName.toLowerCase()})`
      : "targeting 98% clean claims (+30% recovery scenario)",
    htmlContent: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.58;color:#222222;max-width:580px;">
      <p style="margin:0 0 14px;">${greeting}</p>
      <p style="margin:0 0 14px;">Last quick note before I close my file: in an illustrative 4-provider South Florida clinic scenario, tightening NCCI/modifier scrubbing inside the existing EHR ($0 setup) targets a 98% clean-claim rate and up to 30% revenue recovery.</p>
      <p style="margin:0 0 16px;">Whenever you want to test our U.S. AAPC-certified fulfillment team on 20 denied claims for free, want me to send over our 1-page BAA?</p>
      <p style="margin:0;">– Jasmel<br/><span style="color:#555555;font-size:13px;">Jasmel Acosta · Medical Billing Miami Beach<br/>(786) 643-2099 · <a href="${connectUrl}" style="color:#1155cc;">call, text, or grab 15m</a></span></p>
    </div>`,
    textContent: `${greeting}\n\nLast quick note before I close my file: in an illustrative 4-provider South Florida clinic scenario, tightening NCCI/modifier scrubbing inside the existing EHR ($0 setup) targets a 98% clean-claim rate and up to 30% revenue recovery.\n\nWhenever you want to test our U.S. AAPC-certified fulfillment team on 20 denied claims for free, want me to send over our 1-page BAA?\n\n– Jasmel\nJasmel Acosta · Medical Billing Miami Beach\n(786) 643-2099 · ${connectUrl}`,
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
