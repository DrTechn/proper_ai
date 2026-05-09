'use client';

import { useEffect, useRef } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

export default function ChatWidget() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const url = process.env.NEXT_PUBLIC_N8N_CHAT_URL;
    if (!url) {
      console.error('NEXT_PUBLIC_N8N_CHAT_URL is not set');
      return;
    }

    // Custom theme styles
    const style = document.createElement('style');
    style.textContent = `
  :root {
    --chat--color-primary: #1e3a8a;
    --chat--color-primary-shade-50: #1e40af;
    --chat--color-primary-shade-100: #1e429f;
    --chat--color-secondary: #0f172a;
    --chat--color-white: #ffffff;
    --chat--color-light: #f4f6fb;
    --chat--color-light-shade-50: #e6ebf3;
    --chat--color-light-shade-100: #d3dbe9;
    --chat--color-medium: #6b7280;
    --chat--color-dark: #0f172a;
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
    --chat--body--background: #ffffff;
    --chat--input--background: #ffffff;
    --chat--input--text-color: #0f172a;
    --chat--textarea--color: #0f172a;
  }

  /* Force input text dark */
  #n8n-chat input,
  #n8n-chat textarea,
  .chat-window-wrapper input,
  .chat-window-wrapper textarea,
  .n8n-chat-footer input,
  .n8n-chat-footer textarea {
    color: #0f172a !important;
    background: #ffffff !important;
    caret-color: #0f172a !important;
  }

  /* Ensure placeholder is visible */
  #n8n-chat input::placeholder,
  #n8n-chat textarea::placeholder {
    color: #6b7280 !important;
    opacity: 1 !important;
  }

  /* Body / chat area background white */
  .chat-window-wrapper,
  .chat-messages-list,
  #n8n-chat .chat-content {
    background: #ffffff !important;
  }

  /* RTL support */
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

    createChat({
      webhookUrl: url,
      loadPreviousSession: true,
      defaultLanguage: 'ar',
      initialMessages: [
        'مرحبًا 👋',
        'أنا مساعد PROP_AI العقاري. كيف يمكنني مساعدتك؟',
      ],
      i18n: {
        ar: {
          title: 'PROP_AI 🏡',
          subtitle: 'متواجدون 24/7 لمساعدتك',
          footer: '',
          getStarted: 'ابدأ المحادثة',
          inputPlaceholder: 'اكتب سؤالك...',
          closeButtonTooltip: 'إغلاق',
        },
        en: {
          title: 'PROP_AI 🏡',
          subtitle: 'Available 24/7 to help you',
          footer: '',
          getStarted: 'Start chat',
          inputPlaceholder: 'Type your question...',
          closeButtonTooltip: 'Close',
        },
      },
      metadata: {
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      },
    });
  }, []);

  return <div id="n8n-chat" />;
}
