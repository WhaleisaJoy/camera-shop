import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { LoadingStatus } from '../const';
import { DefaultCamera, DefaultPromo } from '../database';
import { createAPI } from '../services/api';
import { makeFakeCamera, makeFakeReview } from './mock';

const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());

const initialStoreState = {
  DATA: {
    cameras: fakeCameras,
    currentCamera: DefaultCamera,
    promo: DefaultPromo,
    similar: fakeCameras,
    reviews: fakeReviews,
    isDataLoaded: false,
    isCurrentCameraLoaded: false,
    isPromoLoaded: false,
    isSimilarLoaded: false,
    isReviewsLoaded: false,
    reviewSendingStatus: LoadingStatus.Idle,
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreWithMiddlewares = configureMockStore(middlewares);

export const storeWithMiddlewares = mockStoreWithMiddlewares(initialStoreState);
