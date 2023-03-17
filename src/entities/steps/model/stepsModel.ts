import { createSlice } from '@reduxjs/toolkit';

type StepsSliceState = {
  step: number;
};

const initialState: StepsSliceState = {
  step: 1,
};

export const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    setPrevStep: (state) => {
      state.step = state.step - 1;
    },
    setNextStep: (state) => {
      state.step = state.step + 1;
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
  },
});

export const { setPrevStep, setNextStep, setStep } = stepsSlice.actions;

export const { reducer } = stepsSlice;
