import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalSliceState = {
  isOpen: boolean;
  type: 'info' | 'error';
  message: string;
  description?: string | null;
};

const initialState: ModalSliceState = {
  isOpen: false,
  type: 'info',
  message: '',
  description: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (_, { payload }: PayloadAction<any>) => {
      return { ...payload, isOpen: true };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const { reducer } = modalSlice;
