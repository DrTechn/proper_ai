import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        
        <div id="n8n-chat"></div>
        
        <Script id="n8n-chat-init" type="module" strategy="afterInteractive">
          {`
            import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(({ createChat }) => {
              createChat({
                webhookUrl: 'https://walaanasr.app.n8n.cloud/webhook/website-chat-trigger/chat',
                loadPreviousSession: true,
                defaultLanguage: 'ar',
                initialMessages: [
                  'مرحبًا 👋',
                  'أنا مساعد PROP_AI العقاري. كيف يمكنني مساعدتك؟'
                ],
                i18n: {
                  ar: {
                    title: 'PROP_AI 🏡',
                    subtitle: 'متواجدون 24/7 لمساعدتك',
                    inputPlaceholder: 'اكتب سؤالك...',
                    getStarted: 'ابدأ المحادثة'
                  }
                }
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}
