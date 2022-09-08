import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from '../reducers/search';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
