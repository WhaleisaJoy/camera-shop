import { createSelector } from 'reselect';
import { LoadingStatus, NameSpace } from '../../const';
import type { Camera } from '../../types/camera';
import type { State } from '../../types/state';

export const getCamerasInBasket = (state: State): Camera[] => state[NameSpace.Basket].camerasInBasket;
export const getCouponDiscount = (state: State): number => state[NameSpace.Basket].couponDiscount;

export const getCamerasInBasketQuantity = createSelector(
  getCamerasInBasket,
  (camerasInBasket) => camerasInBasket.reduce((acc, current) => acc + Number(current.quantity), 0)
);
export const getCamerasInBasketTotalPrice = createSelector(
  getCamerasInBasket,
  (camerasInBasket) => camerasInBasket.reduce((acc, current) => acc + current.price * Number(current.quantity), 0)
);
export const getCamerasInBasketIds = createSelector(
  getCamerasInBasket,
  (camerasInBasket) => camerasInBasket.map(({id}) => id)
);

export const getCouponSendingStatus = (state: State): LoadingStatus => state[NameSpace.Basket].couponSendingStatus;
export const getOrderSendingStatus = (state: State): LoadingStatus => state[NameSpace.Basket].orderSendingStatus;
