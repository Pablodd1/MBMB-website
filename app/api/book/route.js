import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Simple booking API that works without Google Calendar credentials
// Stores bookings and sends confirmation emails via Brevo when configured

const bookings = []; // In-memory storage (replace with DB in production)

async function sendBrevoEmail(toEmail, subject, htmlContent) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not set, skipping email");
    return { skipped: true };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: "Medical Billing Miami Beach", email: "Jasmel@medicalbillingmb.com" },
        to: [{ email: toEmail }],
        subject,
        htmlContent
      })
    });
    return response.ok ? { sent: true } : { error: await response.text() };
  } catch (err) {
    console.error("Brevo email failed:", err);
    return { error: err.message };
  }
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

    // Store the booking
    const booking = {
      id: `mbmb-${Date.now()}`,
      name,
      email,
      phone: phone || "",
      practice: practice || "",
      specialty: specialty || "",
      challenge: challenge || "",
      selected_slot,
      meeting_type: meeting_type || "Free Billing Assessment",
      createdAt: new Date().toISOString(),
      status: "confirmed"
    };
    
    bookings.push(booking);
    console.log("New booking stored:", booking);

    // Send confirmation email to customer
    const customerSubject = `Confirmed: ${booking.meeting_type} with Medical Billing Miami Beach`;
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ec4899, #be185d); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Medical Billing Miami Beach</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Your booking is confirmed!</p>
        </div>
        <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb;">
          <h2 style="color: #111827; margin-top: 0;">Hi ${name},</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for booking a <strong>${booking.meeting_type}</strong> with us.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ec4899;">
            <p style="margin: 0; color: #374151;"><strong>Date:</strong> ${selected_slot.dayName || selected_slot.date}</p>
            <p style="margin: 8px 0 0; color: #374151;"><strong>Time:</strong> ${selected_slot.time}</p>
            <p style="margin: 8px 0 0; color: #374151;"><strong>Booking ID:</strong> ${booking.id}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            We'll send you a reminder before the meeting.<br>
            Questions? Call us at (786) 643-2099 or reply to this email.
          </p>
        </div>
        <div style="padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p>Medical Billing Miami Beach · Miami, FL</p>
          <p><a href="https://medicalbillingmb.com" style="color: #ec4899;">medicalbillingmb.com</a></p>
        </div>
      </div>
    `;
    
    const customerEmailResult = await sendBrevoEmail(email, customerSubject, customerHtml);

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || "jasmelacosta@gmail.com";
    const adminHtml = `
      <p><strong>New Booking Received!</strong></p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone || "N/A"}</p>
      <p>Practice: ${practice || "N/A"}</p>
      <p>Specialty: ${specialty || "N/A"}</p>
      <p>Date: ${selected_slot.dayName || selected_slot.date}</p>
      <p>Time: ${selected_slot.time}</p>
      <p>Challenge: ${challenge || "N/A"}</p>
      <p>Booking ID: ${booking.id}</p>
    `;
    
    await sendBrevoEmail(adminEmail, `New MBMB Booking: ${name}`, adminHtml);

    return NextResponse.json({
      success: true,
      message: "Booking confirmed",
      bookingId: booking.id,
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

// GET endpoint to retrieve bookings (admin use)
export async function GET(req) {
  return NextResponse.json({ bookings });
}
