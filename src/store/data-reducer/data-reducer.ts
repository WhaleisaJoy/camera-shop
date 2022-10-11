import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataReducer } from '../../types/state';
import { fetchCamerasAction } from '../api-actions';

const initialState: DataReducer = {
  cameras: [],
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
      });
  }
});

export default appData.reducer;
