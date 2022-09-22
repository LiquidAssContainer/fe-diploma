import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { apiService } from 'services/apiService';

// const defaultRailcarList = { first: [], second: [], third: [], fourth: [] };

const initialState = {
  tripInfo: {},
  seatsInfo: null,
  selectedRailcarClass: null,
  selectedSeats: [],
  passengersAmount: {
    passengers: {},
    limit: 5,
  },
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
      const list = current(state.seatsInfo[railcarClass]);

      const railcarIndex = list.findIndex(({ coach: { _id } }) => id === _id);
      const railcar = list[railcarIndex];
      const { isSelected } = railcar.coach;

      state.seatsInfo[railcarClass][railcarIndex].coach.isSelected =
        !isSelected;
    },
    changeSeatSelection: (
      state,
      { payload: { placeNumber, railcarId, railcarClass } },
    ) => {
      const list = current(state.seatsInfo[railcarClass]);

      const railcarIndex = list.findIndex(
        ({ coach: { _id } }) => railcarId === _id,
      );
      const railcar = list[railcarIndex];

      const seatIndex = placeNumber - 1;
      const { isSelected } = railcar.seats[seatIndex];

      if (isSelected) {
        const selectedSeatIndex = state.selectedSeats.findIndex(
          ({ id, number }) => id === railcarId && number === placeNumber,
        );
        state.selectedSeats.splice(selectedSeatIndex, 1);
      } else {
        state.selectedSeats.push({ id: railcarId, number: placeNumber });
      }

      // ужас
      state.seatsInfo[railcarClass][railcarIndex].seats[seatIndex].isSelected =
        !isSelected;
    },
  },
  extraReducers: {
    [getSeatsDetailAsync.fulfilled]: (state, { payload }) => {
      state.seatsInfo = payload.reduce((acc, { coach, seats }) => {
        const type = coach.class_type;
        let isSelected = false;
        if (!acc[type]) {
          acc[type] = [];
          isSelected = true;
        }
        acc[type].push({ coach: { isSelected, ...coach }, seats });
        return acc;
      }, {});
    },
  },
});

export const {
  setTripInfo,
  changeSelectedRailcarType,
  changeRailcarSelection,
  changeSeatSelection,
} = seatsSlice.actions;

export const seatsReducer = seatsSlice.reducer;
