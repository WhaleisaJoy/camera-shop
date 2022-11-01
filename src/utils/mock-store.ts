import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../const';
import { DefaultCamera, DefaultPromo } from '../database';
import { createAPI } from '../services/api';
import { makeFakeCamera, makeFakeReview } from './mock';

const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());

const initialStoreState = {
  [NameSpace.Cameras]: {
    cameras: fakeCameras,
    currentCamera: DefaultCamera,
    similar: fakeCameras,
    isCamerasLoaded: false,
    isCurrentCameraLoaded: false,
    isSimilarLoaded: false,
  },
  [NameSpace.Promo]: {
    promo: DefaultPromo,
    isPromoLoaded: false,
  },
  [NameSpace.Reviews]: {
    reviews: fakeReviews,
    isReviewsLoaded: false,
    reviewSendingStatus: LoadingStatus.Idle,
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreWithMiddlewares = configureMockStore(middlewares);

export const storeWithMiddlewares = mockStoreWithMiddlewares(initialStoreState);
