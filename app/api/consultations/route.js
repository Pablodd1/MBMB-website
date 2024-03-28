import { NextResponse } from "next/server";
import { sendEmailNotification } from "@/app/utils/email";

export async function POST(req) {
    const query = await req.json();
    const subject = `New Consultation Form. ${query.fullName}`;
    try {
        const consultation = {
            ...query,
            createdAt: new Date(),
        };
        await sendEmailNotification(process.env.MYABABEEL, subject, consultation);
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
    }
}

