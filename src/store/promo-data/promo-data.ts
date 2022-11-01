import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DefaultPromo } from '../../database';
import { PromoData } from '../../types/state';
import { fetchPromoAction } from '../api-actions';

const initialState: PromoData = {
  promo: DefaultPromo,
  isPromoLoaded: false,
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoaded = false;
      });
  }
});
