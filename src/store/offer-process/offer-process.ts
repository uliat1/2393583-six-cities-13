import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, Cities, SortingType} from '../../const';
import {OfferProcess} from '../../types/state';

const initialState: OfferProcess = {
  selectedCity: Cities.Paris,
  selectedOption: SortingType.Popular,
  error: null,
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    changeOption: (state, action: PayloadAction<SortingType>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const {changeCity, changeOption} = offerProcess.actions;
