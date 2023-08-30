import dayjs from 'dayjs';
import { SortingType } from './const';
import { Offer } from './types/offer';
import { Reviews } from './types/review';
import { ALL_CITIES, RATING_KOEF} from './const';

export function isReviewFormValid(ratingData: number, comment: FormDataEntryValue) {
  return Number(ratingData) > 0 && comment.length < 301 && comment.length > 49;
}

export const sorting = {
  [SortingType.Popular]: (offers: Offer[]) => offers,
  [SortingType.PriceLow]: (offers: Offer[]) => [...offers].sort((a, b) => a.price - b.price),
  [SortingType.PriceHigh]: (offers: Offer[]) => [...offers].sort((a, b) => b.price - a.price),
  [SortingType.TopRated]: (offers: Offer[]) => [...offers].sort((a, b) => b.rating - a.rating),
};

export function calcRatingWidth(rating: number): string {
  return `${RATING_KOEF * Math.round(rating)}%`;
}

export function sortByDate(ratingA: Reviews, ratingB: Reviews) {
  return dayjs(ratingB.date).diff(ratingA.date);
}

export function isPasswordValid(password: string | undefined) {
  if (
    !password ||
    password.length < 2 ||
    !/\d/.test(password) ||
    !/\D/i.test(password) ||
    false
  ) {
    return false;
  }

  return true;
}

export function getRandomCity(cities: typeof ALL_CITIES) {
  return cities[Math.floor(Math.random() * cities.length)];
}

export function getType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

