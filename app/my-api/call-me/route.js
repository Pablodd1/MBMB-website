import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  syncBrevoContact,
  scheduleDay3FollowUpEmail,
  getAdminRecipients,
  isBotOrSpamSubmission,
} from "@UTILS/email";

export async function POST(req) {
  try {
    const body = await req.json();
    const mode = ["call", "text", "virtual"].includes(body.mode) ? body.mode : "call";
    const fullName = String(body.fullName || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const bestTime = String(body.bestTime || "Right Now (Next 15m)").trim();
    const topic = String(body.topic || "").trim();
    const apptDay = String(body.apptDay || "").trim();
    const apptWindow = String(body.apptWindow || "").trim();
    const audience = String(body.audience || "provider").trim();

    if (!fullName) {
      return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
    }

    const phoneDigits = phone.replace(/\D/g, "");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if ((mode === "call" || mode === "text") && phoneDigits.length < 7) {
      return NextResponse.json(
        { message: "Please enter a valid direct phone number." },
        { status: 400 }
      );
    }

    if (mode === "virtual" && !validEmail && phoneDigits.length < 7) {
      return NextResponse.json(
        { message: "Please enter your email (or phone number) so we can send your invite." },
        { status: 400 }
      );
    }

    const spamCheck = isBotOrSpamSubmission({
      fullName,
      email: validEmail ? email : "callback@medicalbillingmb.com",
      orgName: "",
      message: topic,
      honeypot: body.website || "",
      formLoadedAt: body.formLoadedAt || 0,
    });
    if (spamCheck.isSpam) {
      return NextResponse.json({ message: "Success", filtered: true }, { status: 200 });
    }

    const cleanDigits = phone.replace(/[^\d+]/g, "");
    const normalizedPhone = cleanDigits.startsWith("+")
      ? cleanDigits
      : cleanDigits.length === 10
        ? `+1${cleanDigits}`
        : cleanDigits;

    const dialHref = normalizedPhone ? `tel:${normalizedPhone}` : "tel:+17866432099";
    const firstName = fullName.split(/\s+/)[0] || fullName;
    const adminSmsBounceUrl = normalizedPhone
      ? `https://medicalbillingmb.com/call-me?admin-sms=${encodeURIComponent(
          normalizedPhone
        )}&name=${encodeURIComponent(firstName)}&audience=${encodeURIComponent(audience)}`
      : "";

    const isAttorney = audience === "attorney";
    const segmentLabel = isAttorney
      ? "⚖️ Law Firm / Attorney"
      : "🩺 Medical Practice / Provider";
    const nowEst = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    let badgeLabel = '📞 "You Call Me" Button Clicked';
    let headline = `Call Back Requested: ${fullName}`;
    let subject = `📲 CALL NOW (${bestTime}): ${fullName} — ${phone}`;
    let detailRows = `
      <div><strong>Name:</strong> ${fullName}</div>
      <div><strong>Phone:</strong> <a href="${dialHref}" style="color:#0066CC;font-weight:700;text-decoration:none;">${phone}</a></div>
      <div><strong>When to Call:</strong> <span style="color:#047857;font-weight:700;">${bestTime}</span></div>
      <div><strong>Segment:</strong> ${segmentLabel}</div>
      ${validEmail ? `<div><strong>Email:</strong> <a href="mailto:${email}" style="color:#0066CC;">${email}</a></div>` : ""}
    `;
    let primaryActionHtml = `
      <a href="${dialHref}" style="display:inline-block;background:#0066CC;color:#ffffff;font-weight:700;font-size:15px;padding:13px 22px;border-radius:10px;text-decoration:none;margin-right:8px;margin-bottom:8px;">
        📞 Tap to Call ${firstName} (${phone})
      </a>
      ${
        adminSmsBounceUrl
          ? `<a href="${adminSmsBounceUrl}" style="display:inline-block;background:#0a1628;color:#ffffff;font-weight:700;font-size:14px;padding:13px 18px;border-radius:10px;text-decoration:none;margin-bottom:8px;">💬 Or Text ${firstName}</a>`
          : ""
      }
    `;

    if (mode === "text") {
      badgeLabel = '💬 "You Text Me" Button Clicked';
      headline = `SMS Text Requested: ${fullName}`;
      subject = `💬 TEXT NOW: ${fullName} — ${phone}${topic ? ` (${topic})` : ""}`;
      detailRows = `
        <div><strong>Name:</strong> ${fullName}</div>
        <div><strong>Mobile (SMS):</strong> <a href="${adminSmsBounceUrl}" style="color:#0066CC;font-weight:700;text-decoration:none;">${phone}</a></div>
        ${topic ? `<div><strong>Topic:</strong> <span style="color:#047857;font-weight:700;">${topic}</span></div>` : ""}
        <div><strong>Segment:</strong> ${segmentLabel}</div>
        ${validEmail ? `<div><strong>Email:</strong> <a href="mailto:${email}" style="color:#0066CC;">${email}</a></div>` : ""}
      `;
      primaryActionHtml = `
        <a href="${adminSmsBounceUrl}" style="display:inline-block;background:#0066CC;color:#ffffff;font-weight:700;font-size:15px;padding:13px 22px;border-radius:10px;text-decoration:none;margin-right:8px;margin-bottom:8px;">
          💬 Tap to Open SMS to ${firstName} (${phone})
        </a>
        <a href="${dialHref}" style="display:inline-block;background:#0a1628;color:#ffffff;font-weight:700;font-size:14px;padding:13px 18px;border-radius:10px;text-decoration:none;margin-bottom:8px;">
          📞 Or Call
        </a>
      `;
    } else if (mode === "virtual") {
      const slotSummary = [apptDay, apptWindow].filter(Boolean).join(" · ") || bestTime;
      badgeLabel = '🗓️ "Virtual Free Consultation" Requested';
      headline = `15-Min Virtual Consultation: ${fullName}`;
      subject = `🗓️ VIRTUAL APPT (${slotSummary}): ${fullName}`;
      const confirmMailto = validEmail
        ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
            `Confirmed: 15-Min Virtual Consultation (${slotSummary}) — MBMB`
          )}&body=${encodeURIComponent(
            `Hi ${firstName},\n\nLooking forward to our 15-minute virtual consultation on ${slotSummary} EST.\n\nI'll send over the calendar invite link shortly. Feel free to reply here or text/call me at (786) 643-2099 if anything changes.\n\nBest,\nJasmel Acosta\nMedical Billing Miami Beach`
          )}`
        : "";
      detailRows = `
        <div><strong>Name:</strong> ${fullName}</div>
        <div><strong>Requested Slot:</strong> <span style="color:#047857;font-weight:700;">${slotSummary} EST</span></div>
        ${validEmail ? `<div><strong>Email:</strong> <a href="mailto:${email}" style="color:#0066CC;font-weight:700;">${email}</a></div>` : ""}
        ${phone ? `<div><strong>Phone:</strong> <a href="${dialHref}" style="color:#0066CC;font-weight:700;text-decoration:none;">${phone}</a></div>` : ""}
        <div><strong>Segment:</strong> ${segmentLabel}</div>
      `;
      primaryActionHtml = `
        ${
          confirmMailto
            ? `<a href="${confirmMailto}" style="display:inline-block;background:#0066CC;color:#ffffff;font-weight:700;font-size:15px;padding:13px 22px;border-radius:10px;text-decoration:none;margin-right:8px;margin-bottom:8px;">🗓️ Confirm &amp; Email Invite to ${firstName}</a>`
            : ""
        }
        ${
          phoneDigits.length >= 7
            ? `<a href="${adminSmsBounceUrl}" style="display:inline-block;background:#0a1628;color:#ffffff;font-weight:700;font-size:14px;padding:13px 18px;border-radius:10px;text-decoration:none;margin-bottom:8px;">💬 Text ${firstName}</a>`
            : ""
        }
      `;
    }

    const adminHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:540px;padding:24px;border:2px solid #0066CC;border-radius:14px;background:#ffffff;color:#0f172a;">
        <div style="display:inline-block;background:#eff6ff;color:#0066CC;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:99px;margin-bottom:10px;">
          ${badgeLabel}
        </div>
        <h2 style="margin:0 0 14px;font-size:20px;color:#0a1628;">
          ${headline}
        </h2>
        <div style="background:#f8fafc;border-left:4px solid #00A8E8;padding:14px 16px;border-radius:8px;margin-bottom:18px;font-size:15px;line-height:1.6;">
          ${detailRows}
        </div>
        <div>
          ${primaryActionHtml}
        </div>
        <p style="font-size:12px;color:#64748b;margin:16px 0 0;">
          Submitted at ${nowEst} EST
        </p>
      </div>
    `;

    await sendBrevoTransactional({
      to: getAdminRecipients(),
      subject,
      htmlContent: adminHtml,
      tags: [`mbmb-connect-${mode}`],
      ...(validEmail ? { replyTo: { email, name: fullName } } : {}),
    });

    // For Virtual Consultations with a valid email, send a clean human confirmation note + queue Day-3 nurture
    if (mode === "virtual" && validEmail) {
      const slotSummary = [apptDay, apptWindow].filter(Boolean).join(" · ") || bestTime;
      const prospectText = `Hi ${firstName},\n\nGot your request for a free 15-minute virtual consultation (${slotSummary} EST).\n\nI'm locking that window in on my calendar right now and will send over your video link shortly. If you need to adjust the time or want to text me first, my direct line is (786) 643-2099.\n\nTalk soon,\nJasmel Acosta\nMedical Billing Miami Beach\n(786) 643-2099`;
      const prospectHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:540px;color:#1e293b;font-size:15px;line-height:1.65;">
          <p>Hi ${firstName},</p>
          <p>Got your request for a <strong>free 15-minute virtual consultation</strong> (<strong>${slotSummary} EST</strong>).</p>
          <p>I’m locking that window in on my calendar right now and will send over your video link shortly. If you need to adjust the time—or prefer a quick call or text beforehand—my direct line in Miami Beach is <a href="tel:+17866432099" style="color:#0066CC;font-weight:600;text-decoration:none;">(786) 643-2099</a>.</p>
          <p style="margin-top:20px;">Talk soon,<br/><strong>Jasmel Acosta</strong><br/>Medical Billing Miami Beach<br/>(786) 643-2099</p>
        </div>
      `;
      await sendBrevoTransactional({
        to: [{ email, name: fullName }],
        subject: `Got it — 15-min virtual consultation (${slotSummary})`,
        htmlContent: prospectHtml,
        textContent: prospectText,
        tags: ["mbmb-virtual-confirmation"],
      });

      await scheduleDay3FollowUpEmail({
        email,
        fullName,
        isAttorney,
      }).catch(() => {});
    }

    if (validEmail) {
      const inquiryLabel =
        mode === "text"
          ? `SMS Requested (${topic || "Direct Text"})`
          : mode === "virtual"
            ? `Virtual Consultation (${[apptDay, apptWindow].filter(Boolean).join(" ")})`
            : `Callback Requested (${bestTime})`;

      await syncBrevoContact({
        email,
        fullName,
        phone,
        inquiryType: inquiryLabel,
      });
    }

    return NextResponse.json({ ok: true, mode }, { status: 200 });
  } catch (error) {
    console.error("Call-me API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
