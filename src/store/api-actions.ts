import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '../types/state';
import type { Camera } from '../types/camera';
import { APIRoute } from '../const';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);
