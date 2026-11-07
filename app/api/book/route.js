import { NextResponse } from "next/server";
import {
  sendBrevoTransactional,
  syncBrevoContact,
  getAdminRecipients,
} from "@UTILS/email";

export const dynamic = 'force-dynamic';

const bookings = [];

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
        <p style="font-size: 14px; color: #334155;">
          <strong>No prep needed.</strong> If you want us to look at specific denied claims (CO-16, CO-50, CO-97), underpayments, or a Personal Injury billing file on the call, just reply to this email and let me know which payer or EHR you're dealing with.
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
      </div>
    `;

    await sendBrevoTransactional({
      to: getAdminRecipients(),
      subject: `📅 Booked Call: ${booking.name} (${booking.practice || booking.selected_slot})`,
      htmlContent: adminHtml,
      replyTo: { email: booking.email, name: booking.name },
    });

    return NextResponse.json({
      success: true,
      message: "Booking confirmed",
      bookingId: booking.id,
      slot: booking.selected_slot,
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
