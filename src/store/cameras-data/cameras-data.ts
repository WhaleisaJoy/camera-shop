import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DefaultCamera, DefaultPriceRange } from '../../database';
import { CamerasData } from '../../types/state';
import { fetchCamerasAction, fetchCamerasPriceRangeAction, fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../api-actions';

const initialState: CamerasData = {
  cameras: [],
  camerasPriceRange: DefaultPriceRange,
  currentCamera: DefaultCamera,
  similar: [],
  isCamerasLoaded: false,
  isCurrentCameraLoaded: false,
  isSimilarLoaded: false,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasLoaded = false;
      })

      .addCase(fetchCamerasPriceRangeAction.fulfilled, (state, action) => {
        state.camerasPriceRange = action.payload;
      })

      .addCase(fetchCurrentCameraAction.pending, (state) => {
        state.isCurrentCameraLoaded = true;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.currentCamera = action.payload;
        state.isCurrentCameraLoaded = false;
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
