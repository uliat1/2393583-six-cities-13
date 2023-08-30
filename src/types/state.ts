import {store} from '../store/index';
import {Offer, OfferCard} from './offer';
import { AuthorizationStatus, SortingType } from '../const';
import { Reviews } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

export type OfferIdProcess = {
  offer: OfferCard | null;
  isOfferDataLoading: boolean;
  isCommentsLoading: boolean;
  isCommentSending: boolean;
  nearbyOffers: Offer[];
  comments: Reviews[];
  comment: Reviews | null;
  hasOfferError: boolean;
  hasNearbyError: boolean;
  hasCommentsLoadingError: boolean;
  hasCommentSendingError: boolean;
}

export type OffersProcess = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  isOffersDataLoading: boolean;
  errorOccurred: boolean;
}

export type FavoriteProcess = {
  favorites: Offer[];
  isFavoritesDataLoading: boolean;
  errorOccurred: boolean;
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
