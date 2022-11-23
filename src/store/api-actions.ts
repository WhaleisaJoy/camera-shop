import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '../types/state';
import type { Camera, CamerasQueryParams, CamerasPriceRange } from '../types/camera';
import type { PromoType } from '../types/promo';
import type { PostReview, Review } from '../types/review';
import { APIRoute, AppRoute, QueryParams, SortSettings } from '../const';
import { redirectToRoute } from './action';
import { toast } from 'react-toastify';

enum ErrorMessage {
  FetchCameras = 'Не удалось загрузить данные из каталога',
  FetchPriceRange = 'Не удалось загрузить данные о ценах',
  FetchReviews = 'Не удалось загрузить список отзывов',
  PostReview = 'Не удалось отправить отзыв',
}

export const fetchCamerasAction = createAsyncThunk<Camera[], CamerasQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async({ sort, order, priceFrom, priceTo, category, type, level }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(APIRoute.Cameras, {
        params: {
          [QueryParams.Sort]: sort,
          [QueryParams.Order]: order,
          [QueryParams.PriceFrom]: priceFrom,
          [QueryParams.PriceTo]: priceTo,
          [QueryParams.Category]: category,
          [QueryParams.Type]: type,
          [QueryParams.Level]: level,
        }
      });

      return data;
    } catch (error) {
      toast.error(ErrorMessage.FetchCameras);
      throw error;
    }
  },
);

export const fetchCamerasPriceRangeAction = createAsyncThunk<CamerasPriceRange, CamerasQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasPriceRange',
  async ({ category, type, level }, { dispatch, extra: api }) => {
    try {
      const params = {
        [QueryParams.Sort]: SortSettings.Type.Price,
        [QueryParams.Category]: category,
        [QueryParams.Type]: type,
        [QueryParams.Level]: level,
      };

      const camerasPriceAscending = await api.get<Camera[]>(APIRoute.Cameras, {
        params: {
          ...params,
          [QueryParams.Order]: SortSettings.Order.Asc,
        }
      });

      const camerasPriceDescending = await api.get<Camera[]>(APIRoute.Cameras, {
        params: {
          ...params,
          [QueryParams.Order]: SortSettings.Order.Desc,
        }
      });

      return {
        minPrice: camerasPriceAscending.data[0].price,
        maxPrice: camerasPriceDescending.data[0].price,
      };
    } catch (error) {
      toast.error(ErrorMessage.FetchPriceRange);
      throw error;
    }
  },
);

export const fetchCamerasBySearchAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasBySearch',
  async (name, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(APIRoute.Cameras, {
        params: {
          [QueryParams.NameLike]: name,
        }
      });

      return data;
    } catch (error) {
      toast.error(ErrorMessage.FetchCameras);
      throw error;
    }
  },
);

export const fetchCurrentCameraAction = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrentCamera',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
      return data;
    } catch (error) {
      toast.error(ErrorMessage.FetchCameras);
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw error;
    }
  },
);

export const fetchPromoAction = createAsyncThunk<PromoType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<PromoType>(APIRoute.Promo);
      return data;
    } catch (error) {
      toast.error(ErrorMessage.FetchCameras);
      throw error;
    }
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);
      return data;
    } catch (error) {
      toast.error(ErrorMessage.FetchCameras);
      throw error;
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`);
      return data;
    } catch (error) {
      toast.error(ErrorMessage.FetchReviews);
      throw error;
    }
  },
);

export const postReviewAction = createAsyncThunk<void, PostReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async (reviewData, { dispatch, extra: api }) => {
    try {
      await api.post<PostReview>(`${APIRoute.Reviews}`, reviewData);

      dispatch(fetchReviewsAction(reviewData.cameraId.toString()));
    } catch (error) {
      toast.error(ErrorMessage.PostReview);
      throw error;
    }
  },
);
