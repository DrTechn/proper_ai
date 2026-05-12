'use client';

import { useEffect } from 'react';

export default function N8NChatWidget() {
  useEffect(() => {
    // Remove old/background floating real-estate button
    const removeOldFloatingButton = () => {
      const oldButtons = document.querySelectorAll(
        'button[aria-label*="Real estate"], button[aria-label*="open to everyone"]'
      );

      oldButtons.forEach((button) => {
        button.remove();
      });
    };

    removeOldFloatingButton();

    const interval = window.setInterval(removeOldFloatingButton, 500);

    const styleId = 'n8n-chat-style';
    const scriptId = 'n8n-chat-script';

    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';

      script.innerHTML = `
        import { createChat } from "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";

        createChat({
          webhookUrl: "https://recolor-hardcopy-curtly.ngrok-free.dev/webhook/024fb15e-9ab3-45f2-8095-1a33ad8d469d/chat",
          defaultLanguage: "ar",
          initialMessages: [
            "👋 مرحبًا بك في شركة الرواد للعقارات",
            "معك أحمد، كيف ممكن أساعدك؟"
          ],
          i18n: {
            ar: {
              title: "👋 أهلاً وسهلاً",
              subtitle: "ابدأ المحادثة، متواجدين لخدمتكم.",
              footer: "",
              getStarted: "ابدأ الآن",
              inputPlaceholder: "اكتب رسالتك هنا..."
            }
          }
        });
      `;

      document.body.appendChild(script);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
