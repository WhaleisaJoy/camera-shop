import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import dataReducer from './data-reducer/data-reducer';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
});
