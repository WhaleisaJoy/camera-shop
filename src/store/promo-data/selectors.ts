import { NameSpace } from '../../const';
import type { PromoType } from '../../types/promo';
import type { State } from '../../types/state';

export const getPromo = (state: State): PromoType => state[NameSpace.Promo].promo;
export const getLoadedPromoStatus = (state: State): boolean => state[NameSpace.Promo].isPromoLoaded;
