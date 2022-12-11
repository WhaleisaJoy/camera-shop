import { makeFakeCamera } from '../../utils/mock';
import { postCouponAction, postOrderAction } from '../api-actions';
import { addToBasket, basketData, deleteFromBasket, resetBasket, setCouponDiscount, updateCamerasInBasketQuantity } from './basket-data';
import { DEFAULT_COUPON_DISCOUNT, LoadingStatus } from '../../const';
import { datatype } from 'faker';

const fakeCamera = makeFakeCamera();
const fakeCameraWithQuantity = {...fakeCamera, quantity: 1};
const fakeDiscount = datatype.number(50);
const initialStoreState = {
  camerasInBasket: [],
  couponDiscount: DEFAULT_COUPON_DISCOUNT,
  couponSendingStatus: LoadingStatus.Idle,
  orderSendingStatus: LoadingStatus.Idle,
};

describe('Reducer: basketData', () => {
  const state = initialStoreState;

  it('without additional parameters should return initial state', () => {
    expect(basketData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialStoreState);
  });

  describe('Action: postCouponAction', () => {
    it('should update couponSendingStatus to pending when postCouponAction pending', () => {
      expect(basketData.reducer(state, { type: postCouponAction.pending.type }))
        .toEqual({ ...initialStoreState, couponSendingStatus: LoadingStatus.Pending });
    });

    it('should update couponSendingStatus to fulfilled and couponDiscount when postCouponAction fulfilled', () => {
      expect(basketData.reducer(state, { type: postCouponAction.fulfilled.type, payload: fakeDiscount }))
        .toEqual({
          ...initialStoreState,
          couponSendingStatus: LoadingStatus.Fulfilled,
          couponDiscount: fakeDiscount
        });
    });

    it('should update couponSendingStatus to rejected when postCouponAction rejected', () => {
      expect(basketData.reducer(state, { type: postCouponAction.rejected.type }))
        .toEqual({ ...initialStoreState, couponSendingStatus: LoadingStatus.Rejected });
    });
  });

  describe('Action: postOrderAction', () => {
    it('should update orderSendingStatus to pending when postOrderAction pending', () => {
      expect(basketData.reducer(state, { type: postOrderAction.pending.type }))
        .toEqual({ ...initialStoreState, orderSendingStatus: LoadingStatus.Pending });
    });

    it('should update orderSendingStatus to fulfilled when postOrderAction fulfilled', () => {
      expect(basketData.reducer(state, { type: postOrderAction.fulfilled.type }))
        .toEqual({ ...initialStoreState, orderSendingStatus: LoadingStatus.Fulfilled });
    });

    it('should update orderSendingStatus to rejected when postOrderAction rejected', () => {
      expect(basketData.reducer(state, { type: postOrderAction.rejected.type }))
        .toEqual({ ...initialStoreState, orderSendingStatus: LoadingStatus.Rejected });
    });
  });

  describe('Action: addToBasket', () => {
    it('should add new camera to camerasInBasket by addToBasket', () => {
      const customState = {
        ...state,
        camerasInBasket: [],
      };

      expect(basketData.reducer(customState, addToBasket(fakeCameraWithQuantity)))
        .toEqual({ ...customState, camerasInBasket: [fakeCameraWithQuantity] });
    });

    it('should increase existing camera quantity in camerasInBasket by addToBasket', () => {
      const customState = {
        ...state,
        camerasInBasket: [fakeCameraWithQuantity],
      };

      expect(basketData.reducer(customState, addToBasket(fakeCameraWithQuantity)))
        .toEqual({
          ...customState, camerasInBasket: [{
            ...fakeCameraWithQuantity,
            quantity: fakeCameraWithQuantity.quantity + 1
          }]
        });
    });
  });

  describe('Action: updateCamerasInBasketQuantity', () => {
    it('should update camera quantity in camerasInBasket by updateCamerasInBasketQuantity', () => {
      const customState = {
        ...state,
        camerasInBasket: [fakeCameraWithQuantity],
      };
      const fakeQuantity = 5;

      expect(basketData.reducer(customState, updateCamerasInBasketQuantity({ cameraId: fakeCamera.id, quantity: fakeQuantity})))
        .toEqual({ ...customState, camerasInBasket: [{...fakeCamera, quantity: fakeQuantity}] });
    });
  });

  describe('Action: deleteFromBasket', () => {
    it('should delete camera from camerasInBasket by deleteFromBasket', () => {
      const customState = {
        ...state,
        camerasInBasket: [fakeCameraWithQuantity],
      };

      expect(basketData.reducer(customState, deleteFromBasket(fakeCamera.id)))
        .toEqual({ ...customState, camerasInBasket: [] });
    });
  });

  describe('Action: resetBasket', () => {
    it('should reset state to initial by resetBasket', () => {
      const customState = {
        camerasInBasket: [fakeCameraWithQuantity],
        couponDiscount: fakeDiscount,
        couponSendingStatus: LoadingStatus.Rejected,
        orderSendingStatus: LoadingStatus.Fulfilled,
      };

      expect(basketData.reducer(customState, resetBasket()))
        .toEqual(initialStoreState);
    });
  });

  describe('Action: setCouponDiscount', () => {
    it('should update couponDiscount by setCouponDiscount', () => {
      expect(basketData.reducer(state, setCouponDiscount(fakeDiscount)))
        .toEqual({ ...initialStoreState, couponDiscount: fakeDiscount });
    });
  });
});
