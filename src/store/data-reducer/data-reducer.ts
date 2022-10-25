import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { DefaultCamera, DefaultPromo } from '../../database';
import { DataReducer } from '../../types/state';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchPromoAction, fetchReviewsAction, fetchSimilarCamerasAction, postReviewAction } from '../api-actions';

const initialState: DataReducer = {
  cameras: [],
  currentCamera: DefaultCamera,
  promo: DefaultPromo,
  similar: [],
  reviews: [],
  isDataLoaded: false,
  isCurrentCameraLoaded: false,
  isPromoLoaded: false,
  isSimilarLoaded: false,
  isReviewsLoaded: false,
  reviewSendingStatus: LoadingStatus.Idle,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setReviewSendingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.reviewSendingStatus = action.payload;
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
      })

      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoaded = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoaded = false;
      })

      .addCase(postReviewAction.pending, (state) => {
        state.reviewSendingStatus = LoadingStatus.Pending;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.reviewSendingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewSendingStatus = LoadingStatus.Rejected;
      });
  }
});

export const { setReviewSendingStatus } = appData.actions;
export default appData.reducer;
