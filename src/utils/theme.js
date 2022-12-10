import {createTheme} from "@mui/material";

export function inMediaDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function createThemeFromApi(theme) {
  return theme ? createTheme({
    palette: {
      mode: theme.name === 'light' ? 'light' : 'dark',
      background: {
        default: theme.secondColor,
        paper: theme.mainColor,
      },
      primary: {
        main: theme.textColor,
      },
      text: {
        primary: theme.textColor
      }
    }
  }) : createTheme();
}