import { configureStore } from '@reduxjs/toolkit';
import { stepperReducer } from 'reducers/stepper';
import { searchReducer } from '../reducers/search';
import { seatsReducer } from '../reducers/seats';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    stepper: stepperReducer,
    seats: seatsReducer,
  },
});
