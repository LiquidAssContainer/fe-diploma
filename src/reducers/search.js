import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import { apiService } from 'services/apiService';

const initialState = {
  departureCitySearch: { searchString: '', citiesList: [] },
  departureCity: { id: null, name: null },
  arrivalCity: { id: null, name: null },
  departureDate: '',
  arrivalDate: '',
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
  queryParams: {},
  queryString: '',
};

export const getCitiesAsync = createAsyncThunk(
  'search/fetchCities',
  async ({ searchString, fieldName }, { rejectWithValue }) => {
    try {
      const response = await apiService.routes.citiesList({
        name: searchString,
      });

      const data = await response.json();
      return { fieldName, data };
    } catch (e) {
      return rejectWithValue('Что-то пошло не так :(');
    }
  },
);

export const getDirectionsAsync = createAsyncThunk(
  'search/fetchDirections',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        search: { queryString },
      } = getState();

      const queryParsed = qs.parse(queryString, { ignoreQueryPrefix: true });
      const response = await apiService.routes.routesList(queryParsed);
      return await response.json();
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

      return await response.json();
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
    // changeSearchParameter: (state, { payload: { name, value } }) => {
    //   state[name] = value;
    // },
    updateQueryParams: (state, { payload }) => {
      state.queryParams = {
        ...state.queryParams,
        ...payload,
      };
      state.queryString = qs.stringify(state.queryParams, {
        addQueryPrefix: true,
        filter: (_, value) => value || undefined,
      });
    },
    updateQueryString: (state, { payload }) => {
      state.queryString = payload;
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

export const {
  changeSearchString,
  clearCitiesList,
  // changeSearchParameter,
  updateQueryString,
  updateQueryParams,
} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
