import { Rating } from './types/rating';
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

export const RATINGS = [
  {
    score: 5,
    label: 'perfect'
  },
  {
    score: 4,
    label: 'good'
  },
  {
    score: 3,
    label: 'not bad'
  },
  {
    score: 2,
    label: 'badly'
  },
  {
    score: 1,
    label: 'terribly'
  },
] as Rating[];

export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';

export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
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

export enum RequestStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

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
  Favorites = 'FAVORITES',
  OfferById = 'OFFER_BY_ID',
  Offers = 'OFFERS',
  User = 'USER',
}
