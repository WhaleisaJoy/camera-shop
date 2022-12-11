import { makeFakeReview } from '../../utils/mock';
import { LoadingStatus } from '../../const';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { reviewsData, setReviewSendingStatus } from './reviews-data';

const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());
const initialStoreState = {
  reviews: [],
  isReviewsLoaded: false,
  reviewSendingStatus: LoadingStatus.Idle,
};

describe('Reducer: reviewsData', () => {
  const state = initialStoreState;

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialStoreState);
  });

  describe('Action: fetchReviewsAction', () => {
    it('should update isReviewsLoaded to true when fetchReviewsAction pending', () => {
      expect(reviewsData.reducer(state, { type: fetchReviewsAction.pending.type }))
        .toEqual({ ...initialStoreState, isReviewsLoaded: true });
    });

    it('should update reviews by fetchReviewsAction', () => {
      expect(reviewsData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: fakeReviews }))
        .toEqual({ ...initialStoreState, reviews: fakeReviews });
    });
  });

  describe('Action: postReviewAction', () => {
    it('should update reviewSendingStatus to pending when postReviewAction pending', () => {
      expect(reviewsData.reducer(state, { type: postReviewAction.pending.type }))
        .toEqual({ ...initialStoreState, reviewSendingStatus: LoadingStatus.Pending });
    });

    it('should update reviewSendingStatus to fulfilled when postReviewAction fulfilled', () => {
      expect(reviewsData.reducer(state, { type: postReviewAction.fulfilled.type }))
        .toEqual({ ...initialStoreState, reviewSendingStatus: LoadingStatus.Fulfilled });
    });

    it('should update reviewSendingStatus to rejected when postReviewAction rejected', () => {
      expect(reviewsData.reducer(state, { type: postReviewAction.rejected.type }))
        .toEqual({ ...initialStoreState, reviewSendingStatus: LoadingStatus.Rejected });
    });
  });

  describe('Action: setReviewSendingStatus', () => {
    it('should update reviewSendingStatus to fulfilled when setReviewSendingStatus fulfilled', () => {
      expect(reviewsData.reducer(state, setReviewSendingStatus(LoadingStatus.Fulfilled)))
        .toEqual({ ...initialStoreState, reviewSendingStatus: LoadingStatus.Fulfilled });
    });
  });
});
