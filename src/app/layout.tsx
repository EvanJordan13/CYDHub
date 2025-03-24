import Provider from './providers';
import type { Metadata } from 'next';
import { siteConfig } from '@/src/config/site';
import Footer from '@/src/components/Footer';
import NavBar from '@/src/components/NavBar';
import Fonts from '../lib/themes/Fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
