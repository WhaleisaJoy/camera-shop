import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SearchData } from '../../types/state';
import { fetchCamerasBySearchAction } from '../api-actions';

const initialState: SearchData = {
  camerasBySearch: [],
  isCamerasBySearchLoaded: false,
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasBySearchAction.pending, (state) => {
        state.isCamerasBySearchLoaded = true;
      })
      .addCase(fetchCamerasBySearchAction.fulfilled, (state, action) => {
        state.camerasBySearch = action.payload;
        state.isCamerasBySearchLoaded = false;
      });
  }
});
