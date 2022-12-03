import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { basketData } from './basket-data/basket-data';
import { camerasData } from './cameras-data/cameras-data';
import { promoData } from './promo-data/promo-data';
import { reviewsData } from './reviews-data/reviews-data';
import { searchData } from './search-data/search-data';

export const rootReducer = combineReducers({
  [NameSpace.Basket]: basketData.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.Search]: searchData.reducer,
});
