'use client';

import { useEffect } from 'react';

export default function N8NChatWidget() {
  useEffect(() => {
    const removeOldGoldButton = () => {
      const allButtons = Array.from(document.querySelectorAll('button'));

      allButtons.forEach((button) => {
        const style = button.getAttribute('style') || '';
        const aria = button.getAttribute('aria-label') || '';

        const isOldGoldButton =
          aria.includes('Real estate') ||
          aria.includes('open to everyone') ||
          style.includes('accent-gold') ||
          (
            style.includes('position: fixed') &&
            style.includes('bottom: 30px') &&
            style.includes('right: 30px') &&
            style.includes('width: 64px') &&
            style.includes('height: 64px')
          );

        if (isOldGoldButton) {
          button.remove();
        }
      });
    };

    removeOldGoldButton();

    const observer = new MutationObserver(() => {
      removeOldGoldButton();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });



const removeOldGoldButton = () => {
  document
    .querySelectorAll('footer[aria-label*="Real estate"] > button, footer[aria-label*="open to everyone"] > button')
    .forEach((el) => el.remove());
};

removeOldGoldButton();

const oldButtonObserver = new MutationObserver(removeOldGoldButton);

oldButtonObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
    



    
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
      observer.disconnect();
    };
  }, []);

  return null;
}
