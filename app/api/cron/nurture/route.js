import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  buildDay7CaseStudyEmail,
} from "@UTILS/email";

export const dynamic = "force-dynamic";

/**
 * Daily Automated Day-7 Nurture Follow-Up Cron (runs at 9:30 AM EST via vercel.json)
 * Scans Brevo List #21 (website Instant-Offer & Consultation leads) for contacts whose
 * SOURCE attribute matches "MBMB Website (...) | YYYY-MM-DD" between 6 and 10 days ago
 * and who haven't received the Day-7 case-study note yet (no "| D7Sent" marker).
 */
export async function GET(req) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    return NextResponse.json({ ok: false, error: "Missing BREVO_API_KEY" }, { status: 500 });
  }

  // Optional CRON_SECRET check if configured in Vercel env
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts/lists/21/contacts?limit=100&offset=0", {
      headers: {
        Accept: "application/json",
        "api-key": BREVO_API_KEY,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
    }

    const data = await res.json();
    const contacts = data?.contacts || [];
    const nowMs = Date.now();
    const sentTo = [];

    for (const c of contacts) {
      if (c.emailBlacklisted) continue;
      const email = (c.email || "").trim().toLowerCase();
      if (!email || email.includes("medicalbillingmb.com") || email.includes("jasmel")) continue;

      const source = String(c.attributes?.SOURCE || "");
      if (!source.startsWith("MBMB Website") || source.includes("D7Sent") || source.includes("Booked Call")) {
        continue;
      }

      const dateMatch = source.match(/\|\s*(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) continue;

      const optInMs = new Date(`${dateMatch[1]}T12:00:00Z`).getTime();
      const ageDays = (nowMs - optInMs) / (1000 * 60 * 60 * 24);

      // Send Day-7 plain-text case study follow-up when lead is 6.5 to 10.5 days old
      if (ageDays >= 6.5 && ageDays <= 10.5) {
        const isAttorney = /attorney|chronology|legal/i.test(source);
        const fullName = [c.attributes?.FIRSTNAME, c.attributes?.LASTNAME].filter(Boolean).join(" ");
        const orgName = c.attributes?.COMPANY || "";

        const note = buildDay7CaseStudyEmail({ fullName, orgName, isAttorney });
        const sendRes = await sendBrevoTransactional({
          to: [{ email, ...(fullName ? { name: fullName } : {}) }],
          subject: note.subject,
          textContent: note.textContent,
          tags: ["mbmb-day7-casestudy"],
          replyTo: { email: "Jasmel@medicalbillingmb.com", name: "Jasmel Acosta" },
        });

        if (sendRes.sent) {
          // Mark contact so Day-7 email is never sent twice
          await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "api-key": BREVO_API_KEY,
            },
            body: JSON.stringify({
              attributes: {
                SOURCE: `${source} | D7Sent`,
              },
            }),
          });
          sentTo.push(email);
        }
      }
    }

    return NextResponse.json({
      ok: true,
      checked: contacts.length,
      day7SentCount: sentTo.length,
      sentTo,
    });
  } catch (error) {
    console.error("Day-7 nurture cron error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
