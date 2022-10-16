import { NameSpace } from '../../const';
import type { State } from '../../types/state';

export const getCurrentPage = (state: State): number => state[NameSpace.Pagination].currentPage;
