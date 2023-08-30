import { StatusCodes } from 'http-status-codes';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  OffersNearBy = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const ALL_CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const FIRST_CITY = 'Paris';

export const DateFormat = {
  DATE_FORMAT: 'YYYY-MM-DD',
  REVIEW_DATE_FORMAT: 'MMMM YYYY',
};

export const TIMEOUT_SHOW_ERROR = 2000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const NEARBY_OFFFERS_COUNT = 3;

export const HTTP_CODES_TO_DISPLAY = [StatusCodes.BAD_REQUEST, StatusCodes.UNAUTHORIZED, StatusCodes.NOT_FOUND];

export const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const MAX_IMAGES_IN_OFFER_CARD = 6;
export const MAX_COMMENTS_IN_REVIEW = 10;
export const RATING_KOEF = 20;
export const EMPTY_OFFERS = [];
export const EMPTY_FAVORITES = [];

export enum SortingType {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  TopRated = 'Top rated first',
}
export const DEFAULT_SORT = SortingType.Popular;

export enum NameSpace {
  Favorites = 'FAVORITES',
  OfferById = 'OFFER_BY_ID',
  Offers = 'OFFERS',
  User = 'USER',
}

export const AUTH_USER_NAME = 'user-name';
export const MAX_REVIEWS_NUMBER = 10;
export const USER_EMAIL_KEY_NAME = 'Email';

export enum RequestStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}
