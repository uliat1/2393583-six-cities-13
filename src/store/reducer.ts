import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  requirementAuthorization,
  loadingFavorites,
  fillOffersList,
  setError,
  setOffersDataLoadingStatus,
} from './action'
import { AuthorizationStatus } from '../const';


const FIRST_CITY = 'Paris';

const initialState = {
  city: FIRST_CITY,
  offers: [],
  AuthorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload.offers;
    });
    .addCase(loadingFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(requirementAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
});

export { reducer };
