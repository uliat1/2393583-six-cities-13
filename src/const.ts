import { StatusCodes } from 'http-status-codes';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  OfferDetail = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';

export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}
export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const FIRST_CITY = 'Paris';

export const DateFormat = {
  DATE_FORMAT: 'YYYY-MM-DD',
  REVIEW_DATE_FORMAT: 'MMMM YYYY',
};

export enum APIRoute {
  Offers = '/offers',
  OffersNearBy = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const NEARBY_OFFFERS_COUNT = 3;

export const HTTP_CODES_TO_DISPLAY = [StatusCodes.BAD_REQUEST, StatusCodes.UNAUTHORIZED, StatusCodes.NOT_FOUND];

export const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const MAX_IMAGES_IN_OFFER_CARD = 6;
export const MAX_COMMENTS_IN_REVIEW = 10;

export enum SortingType {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const DEFAULT_SORT = SortingType.Popular;

export enum NameSpace {
  Data = 'DATA',
  Offer = 'OFFER',
  User = 'USER',
}


export enum PlaceClasses {
  MainPlacesListClass = 'cities__places-list places__list tabs__content',
  NeighbourhoodPlacesListClass = 'near-places__list places__list',
  MainPlaceCardClass = 'cities__card place-card',
  NeighbourhoodPlaceCardClass = 'near-places__card place-card',
}

export const AUTH_USER_NAME = 'user-name';

export const MAX_REVIEWS_NUMBER = 10;
