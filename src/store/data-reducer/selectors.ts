import dayjs from 'dayjs';
import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import type { Camera } from '../../types/camera';
import type { PromoType } from '../../types/promo';
import type { Review } from '../../types/review';
import type { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCurrentCamera = (state: State): Camera => state[NameSpace.Data].currentCamera;
export const getPromo = (state: State): PromoType => state[NameSpace.Data].promo;
export const getSimilar = (state: State): Camera[] => state[NameSpace.Data].similar;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getLoadedCurrentCameraStatus = (state: State): boolean => state[NameSpace.Data].isCurrentCameraLoaded;
export const getLoadedPromoStatus = (state: State): boolean => state[NameSpace.Data].isPromoLoaded;
export const getLoadedSimilarStatus = (state: State): boolean => state[NameSpace.Data].isSimilarLoaded;
export const getLoadedReviewsStatus = (state: State): boolean => state[NameSpace.Data].isReviewsLoaded;

export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => [...reviews].sort((a, b) => dayjs(b.createAt).diff(dayjs(a.createAt)))
);
