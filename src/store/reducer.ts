import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  requirementAuthorization,
  loadingFavorites,
  fillOffersList,
  setError,
  setOffersDataLoadingStatus,
} from './action';
import { AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';


const FIRST_CITY = 'Paris';

type InitialStateType = {
  city: string;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  favorites: Offer[];
}

const initialState: InitialStateType = {
  city: FIRST_CITY,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  favorites: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload.offers;
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
    .addCase(loadingFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});

export { reducer };
