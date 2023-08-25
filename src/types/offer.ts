import { City } from './cities';
import { Host } from './host';
import { Location } from './location';

export type Offer = {
      id: string;
      title: string;
      type: string;
      price: number;
      city: City;
      location: Location;
      isFavorite: boolean;
      isPremium: boolean;
      rating: number;
      previewImage?: string;
};

export type OfferCard = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods:string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

