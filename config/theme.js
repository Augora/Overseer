import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  useSystemColorMode: false,
  initialColorMode: 'dark',
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  breakpoints: { sm: '30em', md: '48em', lg: '62em', xl: '80em' },
  fonts: {
    heading: 'Roboto Slab',
    body: 'Roboto Slab',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
});
