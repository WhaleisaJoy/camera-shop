import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { BasketData } from '../../types/state';

const initialState: BasketData = {
  camerasInBasket: [],
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Camera>) => {
      state.camerasInBasket.push(action.payload);
    },
  },
});

export const { addToBasket } = basketData.actions;
