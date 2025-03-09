import Provider from './providers';
import type { Metadata } from 'next';
import { siteConfig } from '@/src/config/site';
import Footer from '@/src/components/Footer';
import DropDownInput from '../components/DropDownInput';
import DatePickerInput from '../components/DatePickerInput';
import { Box, Stack } from '@chakra-ui/react';
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
          <Stack gap={4} direction={'row'} width={96}>
            <Box flex={1}>
              <DropDownInput labelText="Select Pronouns" helperText="Pronouns" options={pronouns} isRequired={true} />
            </Box>
            <Box flex={1}>
              <DatePickerInput
                labelText="Select Date"
                helperText="MM/DD/YYYY"
                isRequired
              />
            </Box>
          </Stack>

          <Footer />
        </Provider>
      </body>
    </html >
  );
}
