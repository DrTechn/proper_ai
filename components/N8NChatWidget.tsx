<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />

<script type="module">
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
</script>

