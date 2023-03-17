import { configureStore } from '@reduxjs/toolkit';

import { searchReducer } from 'reducers/search';
import { stepperReducer } from 'reducers/stepper';
import { seatsReducer } from 'reducers/seats';
import { orderReducer } from 'reducers/order';
import { modalModel } from 'entities/modal';

export const store = configureStore({
  reducer: {
    modal: modalModel.reducer,
    search: searchReducer,
    stepper: stepperReducer,
    seats: seatsReducer,
    order: orderReducer,
  },
});
