import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { ReviewsData } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
  isReviewsLoaded: false,
  reviewSendingStatus: LoadingStatus.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviewSendingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.reviewSendingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { setReviewSendingStatus } = reviewsData.actions;
