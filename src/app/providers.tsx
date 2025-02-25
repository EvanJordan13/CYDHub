'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import defaultTheme from '../lib/themes/default';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultTheme}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
