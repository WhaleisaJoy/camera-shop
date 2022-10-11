import { store } from '../store';
import { Camera } from './camera';

export type DataReducer = {
  cameras: Camera[],
  isDataLoaded: boolean,
  isPromoLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
