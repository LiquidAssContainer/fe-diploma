import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
};

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setPrevStep: (state) => {
      state.step = state.step - 1;
    },
    setNextStep: (state) => {
      state.step = state.step + 1;
    },
  },
});

export const { setNextStep, setPrevStep } = stepperSlice.actions;

export const stepperReducer = stepperSlice.reducer;
