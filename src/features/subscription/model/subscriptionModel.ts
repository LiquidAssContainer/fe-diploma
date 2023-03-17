import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from 'shared/api';

export const fetchSubscribe = createAsyncThunk(
  'subscription/fetchSubscribe',
  async (email: string, { rejectWithValue }) => {
    try {
      await apiService.subscribe.subscribeCreate({ email });
      return `Вы успешно подписались на рассылку на данный e-mail: ${email}. Не забывайте проверять «Спам».`;
    } catch (e) {
      return rejectWithValue('Не получилось подписаться :(');
    }
  },
);
