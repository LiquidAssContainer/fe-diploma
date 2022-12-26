import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { apiService } from 'services/apiService';

const fromDatetime = new Date(2022, 12, 11, 0, 0, 0).getTime();
const toDatetime = new Date(2022, 12, 11, 5, 0, 0).getTime();

const initialState = {
  // ↓ заглушка, потому что нельзя запросом добыть эту инфу для конкретного направления
  tripInfo: {
    direction: 'forward',
    from: {
      railway_station_name: 'Заглушечный',
      city: {
        name: 'Заглушка-Сити',
      },
      datetime: fromDatetime,
    },
    to: {
      railway_station_name: 'Славы Альянсу',
      city: {
        name: 'Сити-17',
      },
      datetime: toDatetime,
    },
    train: { name: 'Поровозик-12' },
    price_info: {
      first: {
        top_price: 581,
        bottom_price: 618,
      },
      second: {
        top_price: 581,
        bottom_price: 618,
      },
      third: {
        top_price: 581,
        bottom_price: 618,
      },
      fourth: {
        top_price: 581,
        bottom_price: 618,
      },
    },
    available_seats_info: {
      first: 11,
      second: 22,
      third: 33,
      fourth: 44,
    },
    duration: toDatetime,
  },

  seatsInfo: null,
  selectedRailcarClass: null,
  passengersAmount: {
    adult: { amount: '', selected: 0, limit: 5 },
    child: { amount: '', selected: 0, limit: 0 },
    baby: { amount: '', selected: 0, limit: 0 },
    total: 0,
  },
  selectedAmount: 0,
  selectedSeats: [],
  selectedFeatures: {},
  price: { total: 0, adult: 0, child: 0 },
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
    changeFeatureSelection: (
      state,
      { payload: { id, feature, value, price } },
    ) => {
      const railcar = state.selectedFeatures[id];
      if (!railcar) {
        state.selectedFeatures[id] = {};
      }
      state.selectedFeatures[id][feature] = { value, price };
    },
    recalculatePrice: (state) => {
      const ticketsPrice = state.selectedSeats.reduce(
        (acc, { type, price }) => {
          const currPrice = type === 'adult' ? price : price / 2;
          acc[type] += currPrice;
          acc.total += currPrice;
          return acc;
        },
        { adult: 0, child: 0 },
      );

      const selectedFeatures = current(state.selectedFeatures);
      const featuresPrice = Object.values(selectedFeatures).reduce(
        (acc, railcar) => {
          let sum = 0;
          for (const feature in railcar) {
            const { value, price } = railcar[feature];
            console.log(acc, value, price);
            sum += value ? price : 0;
          }
          return acc + sum;
        },
        0,
      );

      const { adult, child } = ticketsPrice;
      const total = adult + child + featuresPrice;
      state.price = { adult, child, total, features: featuresPrice };
    },
    changeTicketsAmount: (state, { payload: { type, number } }) => {
      const limit = state.passengersAmount[type].limit;

      switch (type) {
        case 'adult':
          if (number <= limit) {
            state.passengersAmount.adult.amount = number;
            state.passengersAmount.child.limit = number * 2;
            state.passengersAmount.baby.limit = number;
          }
        case 'child':
        case 'baby':
          if (number <= limit) {
            state.passengersAmount[type].amount = number;
          }
      }
      for (const type of ['child', 'baby']) {
        const { amount, limit } = state.passengersAmount[type];
        if (amount > limit) {
          state.passengersAmount[type].amount = limit;
        }
      }

      const { adult, child } = current(state.passengersAmount);
      state.selectedAmount = Number(adult.amount) + Number(child.amount);
    },
    changeSeatSelection: (
      state,
      { payload: { placeNumber, railcarId, railcarClass, value, price, type } },
    ) => {
      const list = current(state.seatsInfo[railcarClass]);

      const railcarIndex = list.findIndex(
        ({ coach: { _id } }) => railcarId === _id,
      );

      if (value) {
        state.selectedSeats.push({
          id: railcarId,
          number: placeNumber,
          type,
          price,
        });
        state.passengersAmount[type].selected += 1;
      } else {
        const selectedSeatIndex = state.selectedSeats.findIndex(
          ({ id, number }) => id === railcarId && number === placeNumber,
        );
        const { type } = state.selectedSeats[selectedSeatIndex];
        state.passengersAmount[type].selected -= 1;
        state.selectedSeats.splice(selectedSeatIndex, 1);
      }

      const seatIndex = placeNumber - 1;
      // ужас
      state.seatsInfo[railcarClass][railcarIndex].seats[seatIndex].isSelected =
        value;
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
  changeTicketsAmount,
  changeFeatureSelection,
  recalculatePrice,
} = seatsSlice.actions;

export const seatsReducer = seatsSlice.reducer;
