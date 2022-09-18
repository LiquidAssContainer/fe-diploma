import { configureStore } from '@reduxjs/toolkit';
import { stepperReducer } from 'reducers/stepper';
import { searchReducer } from '../reducers/search';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    stepper: stepperReducer,
  },
});
