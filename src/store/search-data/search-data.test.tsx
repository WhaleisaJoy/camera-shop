import { makeFakeCamera } from '../../utils/mock';
import { fetchCamerasBySearchAction } from '../api-actions';
import { searchData } from './search-data';

const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const initialStoreState = {
  camerasBySearch: [],
  isCamerasBySearchLoaded: false,
};

describe('Reducer: searchData', () => {
  const state = initialStoreState;

  it('without additional parameters should return initial state', () => {
    expect(searchData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialStoreState);
  });

  describe('Action: fetchCamerasBySearchAction', () => {
    it('should update isCamerasBySearchLoaded to true when fetchCamerasBySearchAction pending', () => {
      expect(searchData.reducer(state, { type: fetchCamerasBySearchAction.pending.type }))
        .toEqual({ ...initialStoreState, isCamerasBySearchLoaded: true });
    });

    it('should update cameras by fetchCamerasBySearchAction', () => {
      expect(searchData.reducer(state, { type: fetchCamerasBySearchAction.fulfilled.type, payload: fakeCameras }))
        .toEqual({ ...initialStoreState, camerasBySearch: fakeCameras });
    });
  });
});
