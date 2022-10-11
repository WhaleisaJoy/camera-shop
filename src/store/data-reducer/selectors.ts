import { NameSpace } from '../../const';
import type { Camera } from '../../types/camera';
import type { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

