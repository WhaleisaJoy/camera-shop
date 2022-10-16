import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PAGE, NameSpace } from '../../const';
import type { PaginationReducer } from '../../types/state';

const initialState: PaginationReducer = {
  currentPage: DEFAULT_PAGE,
};

export const pagination = createSlice({
  name: NameSpace.Pagination,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
});

export const { setCurrentPage } = pagination.actions;
export default pagination.reducer;
