import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, lang, sessionId } = await req.json();

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL is not set');
    return NextResponse.json(
      { reply: 'Chatbot is not configured yet. Please contact us directly.' },
      { status: 200 }
    );
  }

  try {
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        lang,        // 'EN' or 'AR' — use this in n8n to decide reply language
        sessionId,   // unique per browser tab — use for conversation memory in n8n
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n returned status ${n8nResponse.status}`);
    }

    // n8n should return JSON with a "reply" field, e.g.: { "reply": "Hello!" }
    // We also accept "output", "text", or "message" as fallbacks.
    const data = await n8nResponse.json();
    const reply =
      data.reply ??
      data.output ??
      data.text ??
      data.message ??
      "Thank you for your message. Our team will follow up shortly.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('n8n webhook error:', error);
    // Graceful fallback — never show a raw error to the user
    return NextResponse.json({
      reply:
        lang === 'AR'
          ? 'نعتذر، حدث خطأ مؤقت. يرجى المحاولة مرة أخرى.'
          : "I'm having a moment — please try again or contact us directly.",
    });
  }
}
