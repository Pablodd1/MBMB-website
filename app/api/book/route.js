import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  syncBrevoContact,
  getAdminRecipients,
} from "@UTILS/email";

export const dynamic = 'force-dynamic';

const bookings = [];

function parseSlotToCalendarDates(selectedSlot) {
  const fallback = new Date(Date.now() + 24 * 60 * 60 * 1000);
  let year = fallback.getUTCFullYear();
  let month = fallback.getUTCMonth() + 1;
  let day = fallback.getUTCDate();
  let hour = 10;
  let minute = 0;

  if (selectedSlot && typeof selectedSlot === 'object') {
    if (typeof selectedSlot.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(selectedSlot.date)) {
      const [y, m, d] = selectedSlot.date.split('-').map(Number);
      year = y; month = m; day = d;
    }
    const timeStr = String(selectedSlot.time || '10:00 AM');
    const tMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (tMatch) {
      hour = Number(tMatch[1]);
      minute = Number(tMatch[2]);
      const mer = (tMatch[3] || '').toUpperCase();
      if (mer === 'PM' && hour < 12) hour += 12;
      if (mer === 'AM' && hour === 12) hour = 0;
    }
  }

  const pad = (n) => String(n).padStart(2, '0');
  const startLocal = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
  const endDate = new Date(Date.UTC(year, month - 1, day, hour, minute + 30));
  const endLocal = `${endDate.getUTCFullYear()}${pad(endDate.getUTCMonth() + 1)}${pad(endDate.getUTCDate())}T${pad(endDate.getUTCHours())}${pad(endDate.getUTCMinutes())}00`;
  return { startLocal, endLocal };
}

function buildCalendarAssets(booking, rawSlot) {
  const { startLocal, endLocal } = parseSlotToCalendarDates(rawSlot);
  const title = `${booking.meeting_type} — Medical Billing Miami Beach`;
  const details = `MBMB Consultation with Jasmel Acosta\\nPractice/Firm: ${booking.practice || 'N/A'}\\nFocus: ${booking.specialty || 'Billing Review'}\\nDirect Phone: (786) 643-2099\\nNote: Do not share PHI before BAA execution.`;

  const gcalParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startLocal}/${endLocal}`,
    ctz: 'America/New_York',
    details: details.replace(/\\n/g, '\n'),
    location: 'Phone / Video — (786) 643-2099',
  });
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?${gcalParams.toString()}`;

  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Medical Billing Miami Beach//Booking//EN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${booking.id}@medicalbillingmb.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=America/New_York:${startLocal}`,
    `DTEND;TZID=America/New_York:${endLocal}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    'LOCATION:Phone / Video — (786) 643-2099',
    'ORGANIZER;CN=Jasmel Acosta:mailto:Jasmel@medicalbillingmb.com',
    `ATTENDEE;CN=${booking.name};RSVP=TRUE:mailto:${booking.email}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  const icsBase64 = Buffer.from(icsLines.join('\r\n'), 'utf8').toString('base64');
  return { googleCalendarUrl, icsBase64 };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, practice, specialty, challenge, selected_slot, meeting_type } = body;

    if (!name || !email || !selected_slot) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, selected_slot" },
        { status: 400 }
      );
    }

    const slotLabel = typeof selected_slot === 'string'
      ? selected_slot
      : `${selected_slot.dayName || selected_slot.date || ''} at ${selected_slot.time || ''}`.trim();

    const booking = {
      id: `mbmb-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: (phone || "").trim(),
      practice: (practice || "").trim(),
      specialty: (specialty || "").trim(),
      challenge: (challenge || "").trim(),
      selected_slot: slotLabel,
      meeting_type: meeting_type || "15-Min Billing & Audit Call",
      createdAt: new Date().toISOString(),
      status: "confirmed"
    };

    bookings.push(booking);
    const { googleCalendarUrl, icsBase64 } = buildCalendarAssets(booking, selected_slot);
    const calendarAttachment = [{ name: "mbmb-consultation.ics", content: icsBase64 }];

    // 1. Sync contact into Brevo CRM
    await syncBrevoContact({
      email: booking.email,
      fullName: booking.name,
      organization: booking.practice,
      phone: booking.phone,
      inquiryType: `Booked Call (${booking.selected_slot})`,
    });

    // 2. Send personal, authentic confirmation email to the doctor / practice manager / attorney
    const customerSubject = `Confirmed: ${booking.selected_slot} — Jasmel (Medical Billing Miami Beach)`;
    const customerHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #0f172a; line-height: 1.6;">
        <p style="font-size: 15px;">Hi ${booking.name.split(' ')[0]},</p>
        <p style="font-size: 15px;">
          I have you locked in for our <strong>${booking.meeting_type}</strong> on <strong>${booking.selected_slot} (EST)</strong>.
        </p>
        <div style="background: #f8fafc; border-left: 4px solid #0066CC; padding: 16px 20px; border-radius: 6px; margin: 20px 0; font-size: 14px;">
          <div style="margin-bottom: 6px;"><strong>When:</strong> ${booking.selected_slot} (EST)</div>
          ${booking.practice ? `<div style="margin-bottom: 6px;"><strong>Practice / Firm:</strong> ${booking.practice}</div>` : ''}
          ${booking.phone ? `<div style="margin-bottom: 6px;"><strong>Phone We'll Call:</strong> ${booking.phone}</div>` : ''}
          <div><strong>Direct Line:</strong> (786) 643-2099</div>
        </div>
        <div style="margin: 18px 0;">
          <a href="${googleCalendarUrl}" style="display: inline-block; background: #0066CC; color: #ffffff; font-weight: bold; text-decoration: none; padding: 11px 20px; border-radius: 8px; font-size: 14px;">
            📅 Add to Google Calendar
          </a>
        </div>
        <p style="font-size: 14px; color: #334155;">
          <strong>No prep needed.</strong> If you want us to look at specific denied claims (CO-16, CO-50, CO-97), underpayments, or a Personal Injury billing file on the call, reply to this email and let me know which payer or EHR you're dealing with (please hold PHI until we execute our BAA/NDA).
        </p>
        <p style="font-size: 14px; color: #0f172a; margin-top: 24px;">
          Talk soon,<br/>
          <strong>Jasmel Acosta</strong><br/>
          Medical Billing Miami Beach (MBMB)<br/>
          Direct: <a href="tel:+17866432099" style="color: #0066CC; text-decoration: none;">(786) 643-2099</a> · <a href="https://medicalbillingmb.com" style="color: #0066CC; text-decoration: none;">medicalbillingmb.com</a>
        </p>
      </div>
    `;

    const customerEmailResult = await sendBrevoTransactional({
      to: [{ email: booking.email, name: booking.name }],
      subject: customerSubject,
      htmlContent: customerHtml,
      attachment: calendarAttachment,
      replyTo: { email: "Jasmel@medicalbillingmb.com", name: "Jasmel Acosta — MBMB" },
    });

    // 3. Send instant alert to Jasmel
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #cbd5e1; border-radius: 10px;">
        <h2 style="margin-top: 0; color: #0a1628;">📅 New Call Booked on MBMB</h2>
        <p><strong>When:</strong> ${booking.selected_slot} (EST)</p>
        <p><strong>Type:</strong> ${booking.meeting_type}</p>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${booking.email}">${booking.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${booking.phone}">${booking.phone || "Not provided"}</a></p>
        <p><strong>Practice / Law Firm:</strong> ${booking.practice || "Not provided"}</p>
        <p><strong>Focus / Specialty:</strong> ${booking.specialty || booking.challenge || "General Billing / Audit"}</p>
        <p><a href="${googleCalendarUrl}">Add to Jasmel Google Calendar</a></p>
      </div>
    `;

    await sendBrevoTransactional({
      to: getAdminRecipients(),
      subject: `📅 Booked Call: ${booking.name} (${booking.practice || booking.selected_slot})`,
      htmlContent: adminHtml,
      attachment: calendarAttachment,
      replyTo: { email: booking.email, name: booking.name },
    });

    return NextResponse.json({
      success: true,
      message: "Booking confirmed",
      bookingId: booking.id,
      slot: booking.selected_slot,
      googleCalendarUrl,
      emailSent: customerEmailResult.sent || false
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ bookings });
}
