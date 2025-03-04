import Provider from './providers';
import type { Metadata } from 'next';
import { siteConfig } from '@/src/config/site';
import Footer from '@/src/components/Footer';
import NavBar from '@/src/components/NavBar';
import Fonts from '../lib/themes/Fonts';
import StreakCard from '../components/StreakCard';
import { Box } from '@chakra-ui/react';

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
          <main>{children}</main>
          <NavBar />
          <Box width={80} margin={6}>
            <StreakCard streak={5} message="You’re on a streak! Finish today’s work, to gain more points" />
          </Box>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
