import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferCard } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';
import { Review, RequestComment } from '../types/review';
import { SortingType } from '../const';

export const changeCity = createAction<{city: string}>('changeCity');
export const fillOffersList = createAction<{offers: Offer[]}>('fillOffersList');
export const requirementAuthorization = createAction<AuthorizationStatus>('requirementAuthorization');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
export const loadFavorites = createAction<Offer[]>('loadFavorites');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
export const loadOfferById = createAction<OfferCard>('loadOfferById');
export const loadNearbyOffers = createAction<Offer[]>('loadNearbyOffers');
export const loadReviews = createAction<Review[]>('loadReviews');
export const sendReview = createAction<RequestComment>('sendReview');
export const changeSortingType = createAction<{type: SortingType}>('changeSortingType');
