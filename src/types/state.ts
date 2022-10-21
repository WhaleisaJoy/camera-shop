import { store } from '../store';
import type { Camera } from './camera';
import type { PromoType } from './promo';

export type DataReducer = {
  cameras: Camera[],
  currentCamera: Camera,
  promo: PromoType,
  isDataLoaded: boolean,
  isCurrentCameraLoaded: boolean,
  isPromoLoaded: boolean,
};

export type PaginationReducer = {
  currentPage: number,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
