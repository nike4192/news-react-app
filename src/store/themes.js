import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL, CURRENT_THEME_KEY} from "../constants";

const getThemeKey = name => `${name}-theme`
const setThemeCache = (name, value) => localStorage.setItem(getThemeKey(name), JSON.stringify(value));
const getCachedTheme = name => JSON.parse(localStorage.getItem(getThemeKey(name)));

const initialState = {
  currentTheme: getCachedTheme(localStorage.getItem(CURRENT_THEME_KEY)),
  error: null,
}

const themesSlice = createSlice({
  name: 'themes',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchTheme.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTheme.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        const theme = action.payload;
        localStorage.setItem(CURRENT_THEME_KEY, theme.name);
        state.currentTheme = theme;
      })
      .addCase(fetchTheme.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export default themesSlice.reducer;

export const selectCurrentTheme = state => state.themes.currentTheme;

export const fetchTheme = createAsyncThunk('themes/fetchThemes', async (name) => {
  let theme = getCachedTheme(name);
  if (theme) {
    return getCachedTheme(name);
  }

  const response = await axios.get(API_URL + '/theme/get', {
    params: {
      name,
    }
  });

  theme = response.data;
  setThemeCache(name, theme);

  return theme;
})
