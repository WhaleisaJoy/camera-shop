import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DefaultCamera, DefaultPromo } from '../../database';
import { DataReducer } from '../../types/state';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchPromoAction, fetchSimilarCamerasAction } from '../api-actions';

const initialState: DataReducer = {
  cameras: [],
  currentCamera: DefaultCamera,
  promo: DefaultPromo,
  similar: [],
  isDataLoaded: false,
  isCurrentCameraLoaded: false,
  isPromoLoaded: false,
  isSimilarLoaded: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    dropCurrentCamera: (state) => {
      state.currentCamera = DefaultCamera;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isDataLoaded = false;
      })

      .addCase(fetchCurrentCameraAction.pending, (state) => {
        state.isCurrentCameraLoaded = true;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.isCurrentCameraLoaded = false;
      })

      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoaded = false;
      })

      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isSimilarLoaded = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similar = action.payload;
        state.isSimilarLoaded = false;
      });
  }
});

export const { dropCurrentCamera } = appData.actions;
export default appData.reducer;
