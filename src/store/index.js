import { configureStore } from "@reduxjs/toolkit";
import newsReducer from './news';
import themesReducer from './themes';

export default configureStore({
  reducer: {
    news: newsReducer,
    themes: themesReducer,
  }
});
