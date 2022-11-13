import { LoadingStatus } from '../const';
import { store } from '../store';
import type { Camera } from './camera';
import type { PromoType } from './promo';
import type { Review } from './review';

export type CamerasData = {
  cameras: Camera[];
  currentCamera: Camera;
  similar: Camera[];
  isCamerasLoaded: boolean;
  isCurrentCameraLoaded: boolean;
  isSimilarLoaded: boolean;
};

export type PromoData = {
  promo: PromoType;
  isPromoLoaded: boolean;
};

export type ReviewsData = {
  reviews: Review[];
  isReviewsLoaded: boolean;
  reviewSendingStatus: LoadingStatus;
};

export type SearchData = {
  camerasBySearch: Camera[];
  isCamerasBySearchLoaded: boolean;
};

export type PaginationReducer = {
  currentPage: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
