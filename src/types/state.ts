import { LoadingStatus } from '../const';
import { store } from '../store';
import type { Camera } from './camera';
import type { PromoType } from './promo';
import type { Review } from './review';

export type DataReducer = {
  cameras: Camera[];
  currentCamera: Camera;
  promo: PromoType;
  similar: Camera[];
  reviews: Review[];
  isDataLoaded: boolean;
  isCurrentCameraLoaded: boolean;
  isPromoLoaded: boolean;
  isSimilarLoaded: boolean;
  isReviewsLoaded: boolean;
  reviewSendingStatus: LoadingStatus;
};

export type PaginationReducer = {
  currentPage: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
