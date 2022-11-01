import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data';
import { promoData } from './promo-data/promo-data';
import { reviewsData } from './reviews-data/reviews-data';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
});
