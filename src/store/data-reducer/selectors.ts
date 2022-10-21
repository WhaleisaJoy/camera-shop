import { NameSpace } from '../../const';
import type { Camera } from '../../types/camera';
import type { PromoType } from '../../types/promo';
import type { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
export const getCurrentCamera = (state: State): Camera => state[NameSpace.Data].currentCamera;
export const getPromo = (state: State): PromoType => state[NameSpace.Data].promo;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
