import { NameSpace } from '../../const';
import type { Camera, CamerasPriceRange } from '../../types/camera';
import type { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const getCamerasPriceRange = (state: State): CamerasPriceRange => state[NameSpace.Cameras].camerasPriceRange;
export const getCurrentCamera = (state: State): Camera => state[NameSpace.Cameras].currentCamera;
export const getSimilar = (state: State): Camera[] => state[NameSpace.Cameras].similar;

export const getLoadedCamerasStatus = (state: State): boolean => state[NameSpace.Cameras].isCamerasLoaded;
export const getLoadedCurrentCameraStatus = (state: State): boolean => state[NameSpace.Cameras].isCurrentCameraLoaded;
export const getLoadedSimilarStatus = (state: State): boolean => state[NameSpace.Cameras].isSimilarLoaded;
