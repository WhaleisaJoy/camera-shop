import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import type { Camera } from '../../types/camera';
import type { State } from '../../types/state';

export const getCamerasInBasket = (state: State): Camera[] => state[NameSpace.Basket].camerasInBasket;
export const getCamerasInBasketQuantity = createSelector(
  getCamerasInBasket,
  (camerasInBasket) => camerasInBasket.reduce((acc, current) => acc + Number(current.quantity), 0)
);
