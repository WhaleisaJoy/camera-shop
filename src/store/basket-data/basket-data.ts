import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COUPON_DISCOUNT, LoadingStatus, NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { BasketData } from '../../types/state';
import { postCouponAction, postOrderAction } from '../api-actions';

type CameraUpdate = {
  cameraId: number;
  quantity: number;
}

const initialState: BasketData = {
  camerasInBasket: [],
  couponDiscount: DEFAULT_COUPON_DISCOUNT,
  couponSendingStatus: LoadingStatus.Idle,
  orderSendingStatus: LoadingStatus.Idle,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Camera>) => {
      //state.camerasInBasket.push(action.payload);
      const camera = action.payload;
      const currentCameraInBasket = state.camerasInBasket.find((cameraInBasket) => cameraInBasket.id === camera.id);

      !currentCameraInBasket
        ? state.camerasInBasket = [ ...state.camerasInBasket, { ...camera, quantity: 1, } ]
        : currentCameraInBasket.quantity = Number(currentCameraInBasket.quantity) + 1;
    },
    updateCamerasInBasketQuantity: (state, action: PayloadAction<CameraUpdate>) => {
      const { cameraId , quantity} = action.payload;
      const currentCameraInBasket = state.camerasInBasket.find((cameraInBasket) => cameraInBasket.id === cameraId);

      currentCameraInBasket && (currentCameraInBasket.quantity = quantity);
    },
    deleteFromBasket: (state, action: PayloadAction<number>) => {
      const cameraToDeleteId = action.payload;
      const currentCameraInBasketIndex = state.camerasInBasket.findIndex((cameraInBasket) => cameraInBasket.id === cameraToDeleteId);

      state.camerasInBasket.splice(currentCameraInBasketIndex, 1);
      // state.camerasInBasket = state.camerasInBasket.filter((camera) => camera.id !== action.payload);
    },
    resetBasket: (state) => {
      state.camerasInBasket = [];
      state.couponDiscount = DEFAULT_COUPON_DISCOUNT;
      state.couponSendingStatus = LoadingStatus.Idle;
      state.orderSendingStatus = LoadingStatus.Idle;
    },

    setCouponDiscount: (state, action: PayloadAction<number>) => {
      state.couponDiscount = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postCouponAction.pending, (state) => {
        state.couponSendingStatus = LoadingStatus.Pending;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.couponSendingStatus = LoadingStatus.Fulfilled;
        state.couponDiscount = action.payload;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.couponSendingStatus = LoadingStatus.Rejected;
      })

      .addCase(postOrderAction.pending, (state) => {
        state.orderSendingStatus = LoadingStatus.Pending;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderSendingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.orderSendingStatus = LoadingStatus.Rejected;
      });
  }
});

export const {
  addToBasket, updateCamerasInBasketQuantity, deleteFromBasket, resetBasket,
  setCouponDiscount,
} = basketData.actions;
