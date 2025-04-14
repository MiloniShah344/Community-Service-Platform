// theme.js
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#f9f9f9',
            paper: '#ffffff',
          },
          primary: {
            main: '#008080', // teal
          },
          secondary: {
            main: '#a8dadc', // soft mint
          },
          text: {
            primary: '#333',
            secondary: '#555',
          },
        }
      : {
          background: {
            default: '#1e1e1e',
            paper: '#2e2e2e',
          },
          primary: {
            main: '#80cbc4', // soft teal
          },
          secondary: {
            main: '#f1faee', // pastel off-white
          },
          text: {
            primary: '#f0f0f0',
            secondary: '#ccc',
          },
        }),
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
