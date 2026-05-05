import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, lang, sessionId } = await req.json();

  const n8nChatUrl = process.env.N8N_CHAT_URL;

  if (!n8nChatUrl) {
    console.error('N8N_CHAT_URL is not set');
    return NextResponse.json(
      { reply: 'Chatbot is not configured yet. Please contact us directly.' },
      { status: 200 }
    );
  }

  try {
    const n8nResponse = await fetch(n8nChatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'sendMessage',
        sessionId: sessionId,
        chatInput: message,
        metadata: { lang },
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n responded with status ${n8nResponse.status}`);
    }

    const data = await n8nResponse.json();

    const reply =
      data.output ??
      data.text ??
      data.reply ??
      data.message ??
      "Thank you for your message. Our team will follow up shortly.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('n8n chat error:', error);
    return NextResponse.json({
      reply:
        lang === 'AR'
          ? 'نعتذر، حدث خطأ مؤقت. يرجى المحاولة مرة أخرى.'
          : "I'm having a moment — please try again or contact us directly.",
    });
  }
}
