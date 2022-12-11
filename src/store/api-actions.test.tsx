import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  fetchCamerasAction,
  fetchCamerasBySearchAction,
  fetchCamerasPriceRangeAction,
  fetchCurrentCameraAction, fetchPromoAction, fetchReviewsAction, fetchSimilarCamerasAction, postCouponAction, postOrderAction, postReviewAction
} from './api-actions';
import { APIRoute, QueryParams } from '../const';
import { State } from '../types/state';
import { makeFakeCamera, makeFakePostCoupon, makeFakePostOrder, makeFakePostReview, makeFakePromo, makeFakeReview } from '../utils/mock';
import { datatype } from 'faker';

const fakeCamera = makeFakeCamera();
const fakePromo = makeFakePromo();
const fakeReview = makeFakeReview();
const fakePostReview = makeFakePostReview();
const fakePostCoupon = makeFakePostCoupon();
const fakePostOrder = makeFakePostOrder();
const fakeCameras = [makeFakeCamera(), fakeCamera];
const fakeReviews = [makeFakeReview(), fakeReview];

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch fetchCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeCameras);

    const fakeParams = {
      sort: null,
      order: null,
      priceFrom: null,
      priceTo: null,
      [QueryParams.Category]: null,
      [QueryParams.Type]: null,
      [QueryParams.Level]: null,
    };

    const store = mockStore();
    await store.dispatch(fetchCamerasAction(fakeParams));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCamerasPriceRangeAction when GET /cameras with params', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeCameras);

    const fakeParams = {
      [QueryParams.Category]: null,
      [QueryParams.Type]: null,
      [QueryParams.Level]: null,
    };

    const store = mockStore();
    await store.dispatch(fetchCamerasPriceRangeAction(fakeParams));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasPriceRangeAction.pending.type,
      fetchCamerasPriceRangeAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCamerasBySearchAction when GET /cameras?name_like', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, [fakeCamera]);

    const store = mockStore();
    await store.dispatch(fetchCamerasBySearchAction(fakeCamera.name));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasBySearchAction.pending.type,
      fetchCamerasBySearchAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCurrentCameraAction when GET /cameras/:id', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}`)
      .reply(200, fakeCamera);

    const store = mockStore();
    await store.dispatch(fetchCurrentCameraAction(fakeCamera.id.toString()));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCurrentCameraAction.pending.type,
      fetchCurrentCameraAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoAction when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakePromo);

    const store = mockStore();
    await store.dispatch(fetchPromoAction());
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarCamerasAction when GET /cameras/:id/similar', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}${APIRoute.Similar}`)
      .reply(200, fakeCameras);

    const store = mockStore();
    await store.dispatch(fetchSimilarCamerasAction(fakeCamera.id.toString()));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /cameras/:id/reviews', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}${APIRoute.Reviews}`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(fakeCamera.id.toString()));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch postReviewAction when POST /reviews', async () => {
    mockAPI
      .onPost(`${APIRoute.Reviews}`, fakePostReview)
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(postReviewAction(fakePostReview));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      fetchReviewsAction.pending.type,
      postReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch postCouponAction when POST /coupons', async () => {
    mockAPI
      .onPost(`${APIRoute.Coupons}`, fakePostCoupon)
      .reply(200, datatype.number());

    const store = mockStore();
    await store.dispatch(postCouponAction(fakePostCoupon));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postCouponAction.pending.type,
      postCouponAction.fulfilled.type
    ]);
  });

  it('should dispatch postOrderAction when POST /orders', async () => {
    mockAPI
      .onPost(`${APIRoute.Orders}`, fakePostOrder)
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(postOrderAction(fakePostOrder));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postOrderAction.pending.type,
      postOrderAction.fulfilled.type
    ]);
  });
});
