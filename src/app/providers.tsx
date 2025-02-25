'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import defaultTheme from '../lib/themes/default';
import Fonts from '../lib/themes/Fonts';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultTheme}>
      <Fonts />
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
