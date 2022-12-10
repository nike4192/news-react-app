import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_URL, NEWS_PAGE_COUNT} from "../constants";
import axios from "axios";

const initialState = {
  news: [],
  currentPage: 1,
  status: 'idle',
  error: null
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      console.log(state, action);
      state.currentPage = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        if (action.payload.length) {
          state.news = state.news.concat(action.payload)
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export const { setCurrentPage } = newsSlice.actions;

export const selectAllNews = state => state.news.news;
export const selectCurrentPage = state => state.news.currentPage;

export default newsSlice.reducer;

export const fetchNews = createAsyncThunk('news/fetchNews', async function(page) {
  const response = await axios.get(API_URL + '/news/get', {
    params: {
      page,
      count: NEWS_PAGE_COUNT,
    }
  });
  return response.data;
})