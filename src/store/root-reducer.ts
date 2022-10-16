import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import dataReducer from './data-reducer/data-reducer';
import paginationReducer from './pagination-reducer/pagination-reducer';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
  [NameSpace.Pagination]: paginationReducer,
});
