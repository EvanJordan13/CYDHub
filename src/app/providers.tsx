'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import defaultTheme from '../lib/themes/default';
import Fonts from '../lib/themes/Fonts';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ChakraProvider value={defaultTheme}>
        <Fonts />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
      </ChakraProvider>
    </UserProvider>
  );
}
