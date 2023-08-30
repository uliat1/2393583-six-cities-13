import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortingType } from '../../../const';
import { OffersProcess } from '../../../types/state';
import { fetchChangeStatusFavoriteAction, fetchOffersAction } from '../../api-actions';
import { FIRST_CITY, DEFAULT_SORT } from '../../../const';

const initialState: OffersProcess = {
  city: FIRST_CITY,
  offers: [],
  sortingType: DEFAULT_SORT,
  isOffersDataLoading: false,
  errorOccurred: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSortingType: (state, action: PayloadAction<SortingType>) => {
      state.sortingType = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.errorOccurred = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.errorOccurred = true;
      })
      .addCase(fetchChangeStatusFavoriteAction.fulfilled, (state, action) => {
        state.offers = state.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        });
      });
  }
});

export const {changeCity, changeSortingType} = offersProcess.actions;
