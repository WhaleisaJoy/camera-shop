import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DefaultPromo } from '../../database';
import { DataReducer } from '../../types/state';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

const initialState: DataReducer = {
  cameras: [],
  promo: DefaultPromo,
  isDataLoaded: false,
  isPromoLoaded: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoaded = false;
      });
  }
});

export default appData.reducer;
