import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<{city: string}>('changeCity');

export const fillOffersList = createAction<{offers: Offer[]}>('fillOffersList');

export const requirementAuthorization = createAction<AuthorizationStatus>('requirementAuthorization');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const loadingFavorites = createAction<{favorites: Offer[]}>('loadingFavorites');

export const setError = createAction<string | null>('setError');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
