import type {} from '@mui/lab/themeAugmentation';
import { createTheme, css } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#ffccbc',
      light: '#ffffee',
      dark: '#cb9b8c',
    },
    secondary: {
      main: '#f8bbd0',
      light: '#ffeeff',
      dark: '#c48b9f',
    },
    background: {
      paper: '#eeeeee',
    },
    info: {
      main: '#a5d6a7',
      light: '#d7ffd9',
      dark: '#75a478',
    },
  },
  components: {
    // Global CSS 설정
    MuiCssBaseline: {
      styleOverrides: `
        :focus {
          box-shadow: rgba(196, 139, 159, 0.7) 0px 0px 15px 0px;
          // outline: 2px solid rgba(196, 139, 159, 0.5);
          outline: none;
        }
        input:focus {
        }
        `,
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        // root: {
        //   Some CSS
        //   fontSize: '1rem',
        // },
        // The ownerState prop is a combination of public props that you pass to the component + internal state of the component.
        // root: ({ ownerState, theme }) => ({
        //   background-color: black;
        //   }),
        // }),
      },
    },
  },
});
