import { NextResponse } from "next/server";
import connect from "@UTILS/connect";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    const client = await connect();
    const { sessionId, messages, userInfo } = await req.json();
    
    try {
        const conversation = {
            sessionId: sessionId || `session_${Date.now()}`,
            messages: messages,
            userInfo: userInfo || {},
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const col = client.db(process.env.MBMB).collection('chatbot_conversations');
        
        // Update existing session or insert new
        await col.updateOne(
            { sessionId: conversation.sessionId },
            { 
                $set: { 
                    messages: conversation.messages,
                    userInfo: conversation.userInfo,
                    updatedAt: conversation.updatedAt
                },
                $setOnInsert: { createdAt: conversation.createdAt }
            },
            { upsert: true }
        );

        return NextResponse.json({ message: 'Conversation saved', sessionId: conversation.sessionId }, { status: 200 });
    } catch (error) {
        console.error('Error saving conversation:', error);
        return NextResponse.json({ message: 'Error saving conversation' }, { status: 500 });
    }
}

export async function GET(req) {
    const client = await connect();
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    
    try {
        const col = client.db(process.env.MBMB).collection('chatbot_conversations');
        
        let query = {};
        if (sessionId) {
            query = { sessionId };
        } else {
            // Return recent conversations (last 50)
            query = {};
        }
        
        const conversations = await col
            .find(query)
            .sort({ updatedAt: -1 })
            .limit(50)
            .toArray();

        return NextResponse.json({ conversations }, { status: 200 });
    } catch (error) {
        console.error('Error fetching conversations:', error);
        return NextResponse.json({ message: 'Error fetching conversations' }, { status: 500 });
    }
}