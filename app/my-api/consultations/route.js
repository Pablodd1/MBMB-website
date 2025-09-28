import { NextResponse } from "next/server";
import { sendEmailNotification } from "@UTILS/email";
import connect from "@UTILS/connect";
import { encryptData } from "@UTILS/encrypt";

export async function POST(req) {
    const client = await connect();
    const query = await req.json();
    try {
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
        <p><strong>Message:</strong> ${consultation.message ? consultation.message : ''}</p>
      `
        const subject = `New Consultation Form. ${consultation.createdAt}`;
        await sendEmailNotification(subject, html);

        const col = client.db(process.env.MBMB).collection(process.env.CONSULTATION);
        const result = await col.insertOne(consultation);
        if (result.acknowledged) {
            return NextResponse.json({ message: 'Success' }, { status: 200 });
        } else {
            return NextResponse.error({ message: 'Failed to Save in Database' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
    }
}

