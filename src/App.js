import './App.css';
import React, {useState} from 'react';
import NewsView from "./news/NewsView";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  createTheme, CssBaseline,
  Paper, Stack,
  Toolbar,
  Typography,
  ThemeProvider
} from '@mui/material';
import NewsPaperIcon from '@mui/icons-material/Newspaper';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {NEWS_VIEW, THEMES_VIEW} from "./constants";
import ThemesView from "./themes/ThemesView";
import store from "./store";
import {fetchTheme, selectCurrentTheme} from "./store/themes";
import {useEffect} from "react";
import {useDispatch, connect, useSelector} from "react-redux";
import {createThemeFromApi, inMediaDarkMode} from "./utils/theme";

function App(props) {
  const theme = props.theme;
  const [view, setView] = React.useState(NEWS_VIEW);

  const currentTheme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentTheme) {
      dispatch(fetchTheme(inMediaDarkMode() ? 'dark' : 'light'));
    }
  })

  const viewTitles = {
    [NEWS_VIEW]: 'News',
    [THEMES_VIEW]: 'Themes',
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack className="App" direction="column">
        <CssBaseline/>
        <Box sx={{zIndex: 1}}>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {viewTitles[view]}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box className="ViewBox" sx={{display: 'flex', position: 'relative', overflow: 'hidden', flex: 1}}>
          <NewsView active={view === NEWS_VIEW} />
          <ThemesView active={view === THEMES_VIEW} />
        </Box>
        <Paper elevation={3} sx={{zIndex: 1}}>
          <BottomNavigation
            value={view}
            onChange={(event, newValue) => {
              setView(newValue);
            }}>
            <BottomNavigationAction
              label="News"
              value={NEWS_VIEW}
              icon={<NewsPaperIcon />} />
            <BottomNavigationAction
              label="Themes"
              value={THEMES_VIEW}
              icon={<ColorLensIcon />} />
          </BottomNavigation>
        </Paper>
      </Stack>
    </ThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    currentTheme: state.themes.currentTheme,
    theme: createThemeFromApi(selectCurrentTheme(state))
  }
}

export default connect(mapStateToProps)(App);
