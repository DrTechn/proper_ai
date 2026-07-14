'use client';

import { useEffect } from 'react';

export default function N8NChatWidget() {
  useEffect(() => {
    const OLD_FLOATING_BUTTON_SELECTORS = [
      'footer[aria-label*="Real estate"] > button',
      'footer[aria-label*="open to everyone"] > button',
      'button[aria-label*="Real estate"]',
      'button[aria-label*="open to everyone"]',
    ];

    const isN8NElement = (element: Element) => {
      return Boolean(
        element.closest('#n8n-chat') ||
          element.closest('.n8n-chat') ||
          element.closest('.n8n-chat-window') ||
          element.closest('.n8n-chat-toggle') ||
          element.closest('[class*="n8n"]')
      );
    };

    const removeOldGoldButton = () => {
      document
        .querySelectorAll(OLD_FLOATING_BUTTON_SELECTORS.join(','))
        .forEach((element) => {
          if (!isN8NElement(element)) {
            element.remove();
          }
        });

      document.querySelectorAll('button').forEach((button) => {
        if (isN8NElement(button)) return;

        const style = button.getAttribute('style') || '';
        const parentAria = button.parentElement?.getAttribute('aria-label') || '';

        const isOldGoldButton =
          parentAria.includes('Real estate') ||
          parentAria.includes('open to everyone') ||
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

    const hideOldButtonStyleId = 'hide-old-gold-chat-button';

    if (!document.getElementById(hideOldButtonStyleId)) {
      const style = document.createElement('style');
      style.id = hideOldButtonStyleId;
      style.innerHTML = `
        footer[aria-label*="Real estate"] > button,
        footer[aria-label*="open to everyone"] > button,
        button[style*="accent-gold"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }

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
          webhookUrl: "https://n8n.kariem.site/webhook/website-chat-trigger/chat",
          defaultLanguage: "ar",
            mode: "window",
           showWelcomeScreen: false,
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
