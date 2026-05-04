import { NextResponse } from "next/server";
import { sendEmailNotification } from "@UTILS/email";
import connect from "@UTILS/connect";
import { encryptData } from "@UTILS/encrypt";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    let client;
    try {
        const query = await req.json();
        
        // Validate required fields
        if (!query.fullName || !query.email || !query.practiceName) {
            return NextResponse.json({ 
                message: 'Missing required fields: fullName, email, practiceName' 
            }, { status: 400 });
        }
        
        const consultation = {
            ...query,
            email: encryptData(query.email),
            createdAt: new Date(),
        };
        
        const html = `
        <h2>New Consultation Form Submission</h2>
        <p><strong>Name:</strong> ${consultation.fullName}</p>
        <p><strong>Email:</strong> [******]</p>
        <p><strong>Practice Name:</strong> ${consultation.practiceName}</p>
        <p><strong>Message:</strong> ${consultation.message || ''}</p>
      `;
        const subject = `New Consultation Form. ${consultation.createdAt}`;
        
        // Try to send email, but don't fail if email is not configured
        let emailSent = false;
        try {
            await sendEmailNotification(subject, html);
            emailSent = true;
        } catch (emailErr) {
            console.warn('Email notification skipped:', emailErr.message);
        }

        // Try to save to database, but don't fail if DB is not configured
        let savedToDb = false;
        try {
            client = await connect();
            const col = client.db(process.env.MBMB).collection(process.env.CONSULTATION);
            const result = await col.insertOne(consultation);
            savedToDb = result.acknowledged;
        } catch (dbErr) {
            console.warn('Database save skipped:', dbErr.message);
        }

        // Return success even if email/DB failed — we captured the lead
        return NextResponse.json({ 
            message: 'Success',
            emailSent,
            savedToDb
        }, { status: 200 });
        
    } catch (error) {
        console.error('Consultation API error:', error);
        return NextResponse.json({ 
            message: 'Internal Server Error',
            error: error.message 
        }, { status: 500 });
    } finally {
        if (client) {
            try { await client.close(); } catch (e) {}
        }
    }
}
