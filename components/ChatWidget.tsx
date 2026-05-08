'use client';

import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    // Inject the chat widget CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    document.head.appendChild(link);

    // Inject custom theme + RTL styles
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --chat--color-primary: #1e3a8a;
        --chat--color-primary-shade-50: #1e40af;
        --chat--color-primary-shade-100: #1e429f;
        --chat--color-secondary: #0f172a;
        --chat--color-secondary-shade-50: #1e293b;
        --chat--color-white: #ffffff;
        --chat--message--bot--background: var(--chat--color-primary);
        --chat--message--bot--color: var(--chat--color-white);
        --chat--message--user--background: var(--chat--color-secondary);
        --chat--message--user--color: var(--chat--color-white);
        --chat--toggle--background: var(--chat--color-primary);
        --chat--toggle--hover--background: var(--chat--color-primary-shade-50);
        --chat--toggle--active--background: var(--chat--color-primary-shade-100);
        --chat--toggle--color: var(--chat--color-white);
        --chat--header--background: #0f172a;
        --chat--header--color: var(--chat--color-white);
      }
      #n8n-chat,
      .n8n-chat-container,
      .n8n-chat-bubble,
      .n8n-chat-user-bubble,
      .n8n-chat-footer input,
      .n8n-chat-footer textarea {
        direction: rtl !important;
        text-align: right !important;
      }
    `;
    document.head.appendChild(style);

    // Load and initialize the chat
    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js' as any)
      .then(({ createChat }) => {
        createChat({
          webhookUrl: process.env.NEXT_PUBLIC_N8N_CHAT_URL || '',
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
              footer: '',
              getStarted: 'ابدأ المحادثة',
              inputPlaceholder: 'اكتب سؤالك...',
              closeButtonTooltip: 'إغلاق'
            },
            en: {
              title: 'PROP_AI 🏡',
              subtitle: 'Available 24/7 to help you',
              footer: '',
              getStarted: 'Start chat',
              inputPlaceholder: 'Type your question...',
              closeButtonTooltip: 'Close'
            }
          },
          metadata: {
            page: window.location.pathname,
            referrer: document.referrer || 'direct'
          }
        });
      })
      .catch((err) => {
        console.error('Failed to load chat widget:', err);
      });
  }, []);

  return <div id="n8n-chat" />;
}
