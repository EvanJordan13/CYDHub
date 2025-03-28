// Fonts.tsx
'use client';

import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
      body {
        font-family: 'Poppins', sans-serif;
      }
    `}
  />
);

export default Fonts;
