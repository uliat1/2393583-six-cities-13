import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offerData } from './offer-data-process/offer-data-process';
import { offerProcess } from './offer-process/offer-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offerData.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
