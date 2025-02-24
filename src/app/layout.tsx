import Provider from './providers';
import type { Metadata } from 'next';
import { siteConfig } from '@/src/config/site';
import Footer from '@/src/components/Footer';
import DropDownInput from '../components/DropDownInput';
import { Stack } from '@chakra-ui/react';
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
  const pronouns = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to answer'];

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <main>{children}</main>
          <Stack width={48} margin={4}>
            <DropDownInput labelText="Select Pronouns" helperText="Pronouns" options={pronouns} isRequired={true} />
          </Stack>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
