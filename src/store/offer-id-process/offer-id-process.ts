import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferIdProcess } from '../../types/state';
import { fetchOfferByIdAction, fetchNearbyOffersAction, fetchReviewsAction, fetchSendReviewAction, fetchChangeStatusFavoriteAction } from '../api-actions';

const initialState: OfferIdProcess = {
  offer: null,
  isOfferDataLoading: false,
  nearbyOffers: [],
  comments: [],
  comment: null,
  hasError: false,
};

export const offerIdProcess = createSlice({
  name: NameSpace.OfferById,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchSendReviewAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchSendReviewAction.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchSendReviewAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.hasError = true;
      }).addCase(fetchChangeStatusFavoriteAction.fulfilled, (state) => {
        state.offer = {...state.offer,
          isFavorite: !state.offer?.isFavorite
        };
      });
  }
});
