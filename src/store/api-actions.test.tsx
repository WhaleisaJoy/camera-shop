import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  // fetchCamerasAction,
  fetchCurrentCameraAction, fetchPromoAction, fetchReviewsAction, fetchSimilarCamerasAction, postReviewAction
} from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { makeFakeCamera, makeFakePostReview, makeFakePromo, makeFakeReview } from '../utils/mock';

const fakeCamera = makeFakeCamera();
const fakePromo = makeFakePromo();
const fakeReview = makeFakeReview();
const fakePostReview = makeFakePostReview();
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

  // it('should dispatch fetchCamerasAction when GET /cameras', async () => {
  //   mockAPI
  //     .onGet(APIRoute.Cameras)
  //     .reply(200, fakeCameras);

  //   const store = mockStore();
  //   await store.dispatch(fetchCamerasAction());
  //   const actions = store.getActions().map(({ type }) => type);

  //   expect(actions).toEqual([
  //     fetchCamerasAction.pending.type,
  //     fetchCamerasAction.fulfilled.type
  //   ]);
  // });

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
});
