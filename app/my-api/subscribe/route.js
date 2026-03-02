import connect from "@UTILS/connect";
import { encryptData } from "@UTILS/encrypt";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    const client = await connect();
    const email = await req.json(); 
    try {
        const col = client.db(process.env.MBMB).collection(process.env.SUBSCRIBER);
        const subscriber = {
            email: encryptData(email),
            createdAt: new Date(),
        };
        const result = await col.insertOne(subscriber);
        if (result.acknowledged) {
            return NextResponse.json({ message: 'Success' }, { status: 200 });
        } else {
            return NextResponse.error({ message: 'Failed to Subscriber' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
    }
}
