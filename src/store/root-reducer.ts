import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
//import { userProcess } from './user-process/user-process.slice';
import { offersProcess } from './offer-process/offer-process';
import { offerIdProcess } from './offer-id-process/offer-id-process';

export const rootReducer = combineReducers({
  //[NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.OfferById]: offerIdProcess.reducer,
  //[NameSpace.Favorites]: favoriteProcess.reducer,
});
