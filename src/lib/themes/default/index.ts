import { createSystem, defaultConfig } from '@chakra-ui/react';

const defaultTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: `'Poppins', sans-serif` },
        heading: { value: `'Poppins', sans-serif` },
        logo: { value: `'Fredoka One', sans-serif` },
      },
      colors: {
        Slate: { value: '#071116' },
        Sky: { value: '#BBD0E5' },
        Lavender: { value: '#8D608C' },

        Flamingo: { value: '#BC3860' },
        FlamingoBorder: { value: '#992B4D' },
        FlamingoHover: { value: '#E44777' },
        SecondaryFlamingoHover: { value: '#FFE6F1' },

        Aqua: { value: '#4D80BB' },
        AquaBorder: { value: '#1F60AB' },
        AquaHover: { value: '#4899EA' },
        SecondaryAquaHover: { value: '#C3DAF2' },

        Gray: { value: '#959494' },
        LightGray: { value: '#F0EFEF' },
        DarkGray: { value: '#5A5A63' },
        DisabledWhite: { value: '#DEDEDE' },
      },
    },
  },
});

export default defaultTheme;
