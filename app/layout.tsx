import { LanguageProvider } from '@/context/LanguageContext';
import N8NChatWidget from '@/components/N8NChatWidget';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LanguageProvider>
          {children}
          <N8NChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
