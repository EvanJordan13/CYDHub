import { createSystem, defaultConfig } from '@chakra-ui/react';

const defaultTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: `'Poppins', sans-serif` },
        heading: { value: `'Poppins', sans-serif` },
      },
      colors: {
        Slate: { value: '#071116' },
        Flamingo: { value: '#BC3860' },
        Aqua: { value: '#4D80BB' },
        Sky: { value: '#BBD0E5' },
        Lavender: { value: '8D608C' },
      },
    },
  },
});

export default defaultTheme;
