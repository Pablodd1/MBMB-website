import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  syncBrevoContact,
  getAdminRecipients,
  isBotOrSpamSubmission,
} from "@UTILS/email";

export async function POST(req) {
  try {
    const body = await req.json();
    const fullName = String(body.fullName || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const bestTime = String(body.bestTime || "Right Now (Next 15m)").trim();
    const audience = String(body.audience || "provider").trim();

    if (!fullName || !phone || phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { message: "Please enter your name and a valid phone number." },
        { status: 400 }
      );
    }

    const spamCheck = isBotOrSpamSubmission({
      fullName,
      email: email || "callback@medicalbillingmb.com",
      orgName: "",
      message: "",
      honeypot: body.website || "",
      formLoadedAt: body.formLoadedAt || 0,
    });
    if (spamCheck.isSpam) {
      return NextResponse.json({ message: "Success", filtered: true }, { status: 200 });
    }

    const cleanDigits = phone.replace(/[^\d+]/g, "");
    const dialHref = cleanDigits.startsWith("+")
      ? `tel:${cleanDigits}`
      : cleanDigits.length === 10
        ? `tel:+1${cleanDigits}`
        : `tel:${cleanDigits}`;

    const isAttorney = audience === "attorney";
    const nowEst = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // 1. Urgent Call-Back Alert to Jasmel with 1-tap Dial Button
    const adminHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:540px;padding:24px;border:2px solid #0066CC;border-radius:14px;background:#ffffff;color:#0f172a;">
        <div style="display:inline-block;background:#eff6ff;color:#0066CC;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:99px;margin-bottom:10px;">
          📲 "You Call Me" Button Clicked
        </div>
        <h2 style="margin:0 0 14px;font-size:20px;color:#0a1628;">
          Call Back Requested: ${fullName}
        </h2>
        <div style="background:#f8fafc;border-left:4px solid #00A8E8;padding:14px 16px;border-radius:8px;margin-bottom:18px;font-size:15px;line-height:1.6;">
          <div><strong>Name:</strong> ${fullName}</div>
          <div><strong>Phone:</strong> <a href="${dialHref}" style="color:#0066CC;font-weight:700;text-decoration:none;">${phone}</a></div>
          <div><strong>When to Call:</strong> <span style="color:#047857;font-weight:700;">${bestTime}</span></div>
          <div><strong>Segment:</strong> ${isAttorney ? "⚖️ Law Firm / Attorney" : "🩺 Medical Practice / Provider"}</div>
          ${email ? `<div><strong>Email:</strong> <a href="mailto:${email}" style="color:#0066CC;">${email}</a></div>` : ""}
        </div>
        <a href="${dialHref}" style="display:inline-block;background:#0066CC;color:#ffffff;font-weight:700;font-size:15px;padding:13px 24px;border-radius:10px;text-decoration:none;">
          📞 Tap to Call ${fullName} Now (${phone})
        </a>
        <p style="font-size:12px;color:#64748b;margin:18px 0 0;">
          Submitted at ${nowEst} EST
        </p>
      </div>
    `;

    await sendBrevoTransactional({
      to: getAdminRecipients(),
      subject: `📲 CALL NOW (${bestTime}): ${fullName} — ${phone}`,
      htmlContent: adminHtml,
      tags: ["mbmb-you-call-me"],
      ...(email ? { replyTo: { email, name: fullName } } : {}),
    });

    // 2. Sync into Brevo CRM if email was carried from campaign URL or entered
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await syncBrevoContact({
        email,
        fullName,
        phone,
        inquiryType: `Callback Requested (${bestTime})`,
      });
    }

    return NextResponse.json({ ok: true, message: "Callback scheduled" }, { status: 200 });
  } catch (error) {
    console.error("Call-me API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
