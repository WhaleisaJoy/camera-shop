import dataReducer from './data-reducer';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../utils/mock';
import { DefaultCamera, DefaultPromo } from '../../database';
import { LoadingStatus } from '../../const';
import { fetchCamerasAction, fetchCurrentCameraAction, fetchPromoAction, fetchReviewsAction, fetchSimilarCamerasAction, postReviewAction } from '../api-actions';

const fakeCamera = makeFakeCamera();
const fakePromo = makeFakePromo();
const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());
const initialStoreState = {
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

describe('Reducer: data', () => {
  const state = initialStoreState;

  it('without additional parameters should return initial state', () => {
    expect(dataReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialStoreState);
  });

  describe('Action: fetchCamerasAction', () => {
    it('should update isDataLoaded to true when fetchCamerasAction pending', () => {
      expect(dataReducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({ ...initialStoreState, isDataLoaded: true });
    });

    it('should update cameras by fetchCamerasAction', () => {
      expect(dataReducer(state, { type: fetchCamerasAction.fulfilled.type, payload: fakeCameras }))
        .toEqual({ ...initialStoreState, cameras: fakeCameras });
    });
  });

  describe('Action: fetchCurrentCameraAction', () => {
    it('should update isCurrentCameraLoaded to true when fetchCurrentCameraAction pending', () => {
      expect(dataReducer(state, { type: fetchCurrentCameraAction.pending.type }))
        .toEqual({ ...initialStoreState, isCurrentCameraLoaded: true });
    });

    it('should update currentCamera by fetchCurrentCameraAction', () => {
      expect(dataReducer(state, { type: fetchCurrentCameraAction.fulfilled.type, payload: fakeCamera }))
        .toEqual({ ...initialStoreState, currentCamera: fakeCamera });
    });
  });

  describe('Action: fetchPromoAction', () => {
    it('should update isPromoLoaded to true when fetchPromoAction pending', () => {
      expect(dataReducer(state, { type: fetchPromoAction.pending.type }))
        .toEqual({ ...initialStoreState, isPromoLoaded: true });
    });

    it('should update promo by fetchPromoAction', () => {
      expect(dataReducer(state, { type: fetchPromoAction.fulfilled.type, payload: fakePromo }))
        .toEqual({ ...initialStoreState, promo: fakePromo });
    });
  });

  describe('Action: fetchSimilarCamerasAction', () => {
    it('should update isSimilarLoaded to true when fetchSimilarCamerasAction pending', () => {
      expect(dataReducer(state, { type: fetchSimilarCamerasAction.pending.type }))
        .toEqual({ ...initialStoreState, isSimilarLoaded: true });
    });

    it('should update similar by fetchSimilarCamerasAction', () => {
      expect(dataReducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeCameras }))
        .toEqual({ ...initialStoreState, similar: fakeCameras });
    });
  });

  describe('Action: fetchReviewsAction', () => {
    it('should update isReviewsLoaded to true when fetchReviewsAction pending', () => {
      expect(dataReducer(state, { type: fetchReviewsAction.pending.type }))
        .toEqual({ ...initialStoreState, isReviewsLoaded: true });
    });

    it('should update reviews by fetchReviewsAction', () => {
      expect(dataReducer(state, { type: fetchReviewsAction.fulfilled.type, payload: fakeReviews }))
        .toEqual({ ...initialStoreState, reviews: fakeReviews });
    });
  });

  describe('Action: postReviewAction', () => {
    it('should update reviewSendingStatus to pending when postReviewAction pending', () => {
      expect(dataReducer(state, { type: postReviewAction.pending.type }))
        .toEqual({ ...initialStoreState, reviewSendingStatus: LoadingStatus.Pending });
    });

    it('should update reviewSendingStatus to fulfilled when postReviewAction fulfilled', () => {
      expect(dataReducer(state, { type: postReviewAction.fulfilled.type }))
        .toEqual({ ...initialStoreState, reviewSendingStatus: LoadingStatus.Fulfilled });
    });

    it('should update reviewSendingStatus to rejected when postReviewAction rejected', () => {
      expect(dataReducer(state, { type: postReviewAction.rejected.type }))
        .toEqual({ ...initialStoreState, reviewSendingStatus: LoadingStatus.Rejected });
    });
  });
});
