import { NameSpace } from '../../const';
import type { Camera } from '../../types/camera';
import type { State } from '../../types/state';

export const getCamerasBySearch = (state: State): Camera[] => state[NameSpace.Search].camerasBySearch;

export const getLoadedCamerasBySearchStatus = (state: State): boolean => state[NameSpace.Search].isCamerasBySearchLoaded;
