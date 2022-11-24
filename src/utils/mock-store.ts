import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../const';
import { DefaultCamera, DefaultPriceRange, DefaultPromo } from '../database';
import { createAPI } from '../services/api';
import { makeFakeCamera, makeFakeReview } from './mock';

const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const fakeSearchCameras = [makeFakeCamera()];
const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());

const initialStoreState = {
  [NameSpace.Cameras]: {
    cameras: fakeCameras,
    camerasPriceRange: DefaultPriceRange,
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
  [NameSpace.Search]: {
    camerasBySearch: fakeSearchCameras,
    isCamerasBySearchLoaded: false,
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
export const mockStoreWithMiddlewares = configureMockStore(middlewares);

export const storeWithMiddlewares = mockStoreWithMiddlewares(initialStoreState);
