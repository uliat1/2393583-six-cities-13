import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, OfferCard } from '../types/offer';
import { APIRoute, AppRoute } from '../const';
import {
  fillOffersList,
  loadFavorites,
  setOffersDataLoadingStatus,
  redirectToRoute,
  loadOfferById,
  loadNearbyOffers,
  loadReviews,
  sendReview,
} from './action';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, RequestComment } from '../types/review';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(fillOffersList({offers: data}));
    },
  );

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchOfferById',
    async (offerId, {dispatch, extra: api}) => {
      const {data} = await api.get<OfferCard>(`${APIRoute.Offers}/${offerId}`);
      dispatch(loadOfferById(data));
    },
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchNearbyOffers',
    async (offerId, {dispatch, extra: api}) => {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(loadNearbyOffers(data));
    },
  );

export const fetchCommentsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchComments',
    async (offerId, {dispatch, extra: api}) => {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(loadReviews(data));
    },
  );

export const fetchSendReviewAction = createAsyncThunk<void, {rating: number; comment: string; id: string}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchSendReviewAction',
    async ({rating, comment, id}, {dispatch, extra: api}) => {
      const {data} = await api.post<RequestComment>(`${APIRoute.Comments}/${id}`, {rating, comment});
      dispatch(sendReview(data));
    },
  );

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchFavorites',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Faforite);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadFavorites(data));
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (login, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, login);
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();

  },
);
