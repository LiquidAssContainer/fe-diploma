import { configureStore } from '@reduxjs/toolkit';

import { modalModel } from 'entities/modal';
import { stepsModel } from 'entities/steps';
import { searchReducer } from 'reducers/search';
import { seatsReducer } from 'reducers/seats';
import { orderReducer } from 'reducers/order';

export const store = configureStore({
  reducer: {
    modal: modalModel.reducer,
    search: searchReducer,
    steps: stepsModel.reducer,
    seats: seatsReducer,
    order: orderReducer,
  },
});
