import { camerasData } from './cameras-data';
// import { makeFakeCamera } from '../../utils/mock';
import { DefaultCamera } from '../../database';
// import { fetchCamerasAction, fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../api-actions';

// const fakeCamera = makeFakeCamera();
// const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const initialStoreState = {
  cameras: [],
  currentCamera: DefaultCamera,
  similar: [],
  isCamerasLoaded: false,
  isCurrentCameraLoaded: false,
  isSimilarLoaded: false,
};

describe('Reducer: camerasData', () => {
  // const state = initialStoreState;

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialStoreState);
  });

  // describe('Action: fetchCamerasAction', () => {
  //   it('should update isCamerasLoaded to true when fetchCamerasAction pending', () => {
  //     expect(camerasData.reducer(state, { type: fetchCamerasAction.pending.type }))
  //       .toEqual({ ...initialStoreState, isCamerasLoaded: true });
  //   });

  //   it('should update cameras by fetchCamerasAction', () => {
  //     expect(camerasData.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: fakeCameras }))
  //       .toEqual({ ...initialStoreState, cameras: fakeCameras });
  //   });
  // });

  // describe('Action: fetchCurrentCameraAction', () => {
  //   it('should update isCurrentCameraLoaded to true when fetchCurrentCameraAction pending', () => {
  //     expect(camerasData.reducer(state, { type: fetchCurrentCameraAction.pending.type }))
  //       .toEqual({ ...initialStoreState, isCurrentCameraLoaded: true });
  //   });

  //   it('should update currentCamera by fetchCurrentCameraAction', () => {
  //     expect(camerasData.reducer(state, { type: fetchCurrentCameraAction.fulfilled.type, payload: fakeCamera }))
  //       .toEqual({ ...initialStoreState, currentCamera: fakeCamera });
  //   });
  // });

  // describe('Action: fetchSimilarCamerasAction', () => {
  //   it('should update isSimilarLoaded to true when fetchSimilarCamerasAction pending', () => {
  //     expect(camerasData.reducer(state, { type: fetchSimilarCamerasAction.pending.type }))
  //       .toEqual({ ...initialStoreState, isSimilarLoaded: true });
  //   });

  //   it('should update similar by fetchSimilarCamerasAction', () => {
  //     expect(camerasData.reducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeCameras }))
  //       .toEqual({ ...initialStoreState, similar: fakeCameras });
  //   });
  // });
});
