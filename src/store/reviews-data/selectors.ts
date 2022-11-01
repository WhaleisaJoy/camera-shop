import dayjs from 'dayjs';
import { createSelector } from 'reselect';
import { LoadingStatus, NameSpace } from '../../const';
import type { Review } from '../../types/review';
import type { State } from '../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getLoadedReviewsStatus = (state: State): boolean => state[NameSpace.Reviews].isReviewsLoaded;
export const getReviewSendingStatus = (state: State): LoadingStatus => state[NameSpace.Reviews].reviewSendingStatus;

export const getSortedReviews = createSelector(
  getReviews,
  (reviews) => [...reviews].sort((a, b) => dayjs(b.createAt).diff(dayjs(a.createAt))));
