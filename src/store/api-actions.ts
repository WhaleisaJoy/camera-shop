import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '../types/state';
import type { Camera, CamerasQueryParams, CamerasPriceRange } from '../types/camera';
import type { PromoType } from '../types/promo';
import type { PostReview, Review } from '../types/review';
import { APIRoute, AppRoute, QueryParams, SortSettings } from '../const';
import { redirectToRoute } from './action';

export const fetchCamerasAction = createAsyncThunk<Camera[], CamerasQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async({ sort, order, priceFrom, priceTo, category, type, level }, { dispatch, extra: api }) => {
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
  },
);

export const fetchCamerasPriceRangeAction = createAsyncThunk<CamerasPriceRange, CamerasQueryParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasPriceRange',
  async ({ category, type, level }, { dispatch, extra: api }) => {
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
  },
);

export const fetchCamerasBySearchAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasBySearch',
  async (name, { dispatch, extra: api }) => {
    const { data } = await api.get<Camera[]>(APIRoute.Cameras, {
      params: {
        [QueryParams.NameLike]: name,
      }
    });

    return data;
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
    const { data } = await api.get<PromoType>(APIRoute.Promo);
    return data;
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<void, PostReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async (reviewData, { dispatch, extra: api }) => {
    await api.post<PostReview>(`${APIRoute.Reviews}`, reviewData);

    dispatch(fetchReviewsAction(reviewData.cameraId.toString()));
  },
);
