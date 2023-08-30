import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { OfferIdProcess } from '../../../types/state';
import { Offer } from '../../../types/offer';
import {
  fetchOfferByIdAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  fetchChangeStatusFavoriteAction,
  fetchSendCommentAction,
} from '../../api-actions';

const initialState: OfferIdProcess = {
  offer: null,
  isOfferDataLoading: false,
  isCommentsLoading: false,
  isCommentSending: false,
  nearbyOffers: [],
  comments: [],
  comment: null,
  hasOfferError: false,
  hasNearbyError: false,
  hasCommentsLoadingError: false,
  hasCommentSendingError: false,
};

export const offerIdProcess = createSlice({
  name: NameSpace.OfferById,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.isOfferDataLoading = true;
        state.hasOfferError = false;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferByIdAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.hasOfferError = true;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.hasNearbyError = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.hasNearbyError = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
        state.hasCommentsLoadingError = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsLoading = false;
        state.hasCommentsLoadingError = true;
      })
      .addCase(fetchSendCommentAction.pending, (state) => {
        state.isCommentSending = true;
        state.hasCommentSendingError = false;
      })
      .addCase(fetchSendCommentAction.fulfilled, (state, action) => {
        state.isCommentSending = false;
        state.comment = action.payload;

        if (action.payload) {
          state.comments.unshift(action.payload);
        }
      })
      .addCase(fetchSendCommentAction.rejected, (state) => {
        state.isCommentSending = false;
        state.hasCommentSendingError = true;
      })
      .addCase(fetchChangeStatusFavoriteAction.fulfilled, (state, action) => {
        if (state.offer) {
          state.offer = {...state.offer,
            isFavorite: !state.offer.isFavorite
          };
        }
        state.nearbyOffers = state.nearbyOffers.reduce<Offer[]>((acc, offer) => {
          if (offer.id === action.payload.id) {
            return [...acc, {...offer,
              isFavorite: !offer.isFavorite}];
          }
          return [...acc, offer];
        }, []);
      });


  }
});
