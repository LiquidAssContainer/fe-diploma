import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';

const initialState = {
  // departureCitySearch: { searchString: '', citiesList: [] },
  // departureCity: { id: null, name: null },
  // arrivalCity: { id: null, name: null },
  // departureDate: '',
  // arrivalDate: '',
  citiesList: { to_city: [], from_city: [] },
  cities: {
    'arrival-city': { id: null, name: '' },
    'departure-city': { id: null, name: '' },
  },
  resultItems: [],
  resultsCount: 0,
  lastDirections: [],
  page: 1,
  limit: 5,
  sortBy: 'date',
};

export const getCitiesAsync = createAsyncThunk(
  'search/fetchCities',
  async ({ searchString, fieldName }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/routes/cities?name=${searchString}`,
      );

      const data = await response.json();
      return { fieldName, data };
    } catch (e) {
      return rejectWithValue('Что-то пошло не так :(');
    }
  },
);

export const getDirectionsAsync = createAsyncThunk(
  'search/fetchDirections',
  async (
    { from_city, to_city, ...formData },
    { rejectWithValue, getState },
  ) => {
    try {
      const findCityId = (name, list) => {
        const city = list.find((city) => city.name === name);
        return city?._id || name;
      };

      const {
        search: {
          citiesList: { to_city: to_city_list, from_city: from_city_list },
        },
      } = getState();

      const from_city_id = findCityId(from_city, from_city_list);
      const to_city_id = findCityId(to_city, to_city_list);
      const qsdata = { ...formData, from_city_id, to_city_id };

      const queryString = qs.stringify(qsdata, {
        addQueryPrefix: true,
        // skipNulls: true,
      });
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/routes${queryString}`,
      );

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue('Что-то пошло не так :(');
    }
  },
);

export const getLastDirectionsAsync = createAsyncThunk(
  'search/fetchLastDirections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/routes/last`,
      );

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue('Что-то пошло не так :(');
    }
  },
);

export const getLastTicketsAsync = createAsyncThunk(
  'search/fetchLastTickets',
  async (
    { from_city, to_city, ...formData },
    { rejectWithValue, getState },
  ) => {
    try {
      const findCityId = (name, list) => {
        const city = list.find((city) => city.name === name);
        return city?.id || name;
      };

      const {
        search: {
          citiesList: { to_city: to_city_list, from_city: from_city_list },
        },
      } = getState();

      const from_city_id = findCityId(from_city, from_city_list);
      const to_city_id = findCityId(to_city, to_city_list);
      const qsdata = { ...formData, from_city_id, to_city_id };

      const queryString = qs.stringify(qsdata, {
        addQueryPrefix: true,
        // skipNulls: true,
      });
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/routes?${queryString}`,
      );

      const data = await response.json();
      return { data };
    } catch (e) {
      return rejectWithValue('Что-то пошло не так :(');
    }
  },
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchString: (state, { payload }) => {
      state[payload.fieldName] = payload.searchString;
    },
    clearCitiesList: (state, { payload }) => {
      state.citiesList[payload] = [];
    },
    changeSearchParameter: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: {
    [getCitiesAsync.fulfilled]: (state, { payload: { data, fieldName } }) => {
      state.citiesList[fieldName] = data;
    },
    [getDirectionsAsync.fulfilled]: (
      state,
      { payload: { total_count, items } },
    ) => {
      state.resultItems = items;
      state.resultsCount = total_count;
    },
    [getLastDirectionsAsync.fulfilled]: (state, { payload }) => {
      state.lastDirections = payload;
    },
  },
});

export const { changeSearchString, clearCitiesList, changeSearchParameter } =
  searchSlice.actions;

export const searchReducer = searchSlice.reducer;
