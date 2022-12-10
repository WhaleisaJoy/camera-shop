import { LoadingStatus } from '../const';
import { store } from '../store';
import type { Camera, CamerasPriceRange } from './camera';
import type { PromoType } from './promo';
import type { Review } from './review';

export type BasketData = {
  camerasInBasket: Camera[];
  couponDiscount: number;
  couponSendingStatus: LoadingStatus;
  orderSendingStatus: LoadingStatus;
};

export type CamerasData = {
  cameras: Camera[];
  camerasPriceRange: CamerasPriceRange;
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
