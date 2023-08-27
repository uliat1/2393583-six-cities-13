import { City } from './cities';
import { Host } from './host';
import { Location } from './location';

export type Offer = {
  id: number;
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: Location;
};

export type Offers = Offer[];
