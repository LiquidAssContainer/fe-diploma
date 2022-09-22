import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { apiService } from 'services/apiService';

const defaultRailcarList = { first: [], second: [], third: [], fourth: [] };

const initialState = {
  tripInfo: {},
  seatsInfo: { first: [], second: [], third: [], fourth: [] },
  selectedRailcarClass: null,
  railcarSelection: null,
  selectedSeats: null,
  totalPrice: 0,
};

export const getSeatsDetailAsync = createAsyncThunk(
  'search/fetchSeatsDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.routes.seatsDetail(id);
      return await response.json();
    } catch (e) {
      return rejectWithValue('Что-то пошло не так :(');
    }
  },
);

export const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setTripInfo: (state, { payload: { from, to, ...info } }) => {
      state.tripInfo = { ...info, from, to };
    },
    changeSelectedRailcarType: (state, { payload }) => {
      state.selectedRailcarClass = payload;
    },
    changeRailcarSelection: (state, { payload: { id, railcarClass } }) => {
      const list = current(state.railcarSelection[railcarClass]);

      const railcar = list.find(({ _id }) => id === _id);
      const railcarIndex = list.findIndex(({ _id }) => id === _id);
      const { isSelected } = railcar;

      state.railcarSelection[railcarClass][railcarIndex].isSelected =
        !isSelected;
    },
  },
  extraReducers: {
    [getSeatsDetailAsync.fulfilled]: (state, { payload }) => {
      state.seatsInfo = payload.reduce(
        (acc, curr) => {
          const type = curr.coach.class_type;
          // if (!acc[type]) {
          //   acc[type] = [];
          // }
          acc[type].push(curr);
          return acc;
        },
        { ...defaultRailcarList },
      );

      if (!state.railcarSelection) {
        state.railcarSelection = { ...defaultRailcarList };
        for (const railcarClass in state.railcarSelection) {
          state.railcarSelection[railcarClass] = state.seatsInfo[
            railcarClass
          ].reduce((acc, curr, i) => {
            const { _id, name } = curr.coach;
            acc.push({ _id, name, isSelected: i === 0 });
            return acc;
          }, []);
        }
      }
    },
  },
});

export const {
  setTripInfo,
  changeSelectedRailcarType,
  initRailcarSelectionList,
  changeRailcarSelection,
} = seatsSlice.actions;

export const seatsReducer = seatsSlice.reducer;
