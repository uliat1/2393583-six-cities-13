import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  fillOffersList,
  requirementAuthorization,
  setOffersDataLoadingStatus,
  loadFavorites,
  loadOfferById,
  loadNearbyOffers,
  loadReviews,
  sendReview,
  changeSortingType,
} from './action';
import { Offer, OfferCard } from '../types/offer';
import { AuthorizationStatus, RequestStatus, FIRST_CITY } from '../const';
import { fetchOfferByIdAction } from './api-actions';
import { Review, RequestComment } from '../types/review';
import { SortingType, DEFAULT_SORT} from '../const';

type InitialStateType = {
  city: string;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  favorites: Offer[];
  offer: OfferCard | null;
  offerFetchingStatus: RequestStatus;
  nearbyOffers: Offer[];
  comments: Review[];
  comment: RequestComment | null;
  sortingType: SortingType;
}

const initialState: InitialStateType = {
  city: FIRST_CITY,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  favorites: [],
  offer: null,
  offerFetchingStatus: RequestStatus.Idle,
  nearbyOffers: [],
  comments: [],
  comment: null,
  sortingType: DEFAULT_SORT,
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
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(loadOfferById, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchOfferByIdAction.pending, (state) => {
      state.offerFetchingStatus = RequestStatus.Pending;
    })
    .addCase(fetchOfferByIdAction.fulfilled, (state) => {
      state.offerFetchingStatus = RequestStatus.Success;
    })
    .addCase(fetchOfferByIdAction.rejected, (state) => {
      state.offerFetchingStatus = RequestStatus.Error;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(sendReview, (state, action) => {
      state.comment = action.payload;
    })
    .addCase(changeSortingType, (state, action) => {
      state.sortingType = action.payload.type;
    });
});

export { reducer };
