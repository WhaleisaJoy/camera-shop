import { useMemo } from 'react';
import { PRODUCT_PAGINATION_STEP } from '../const';

export const usePagination = (dataLength: number) => {
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(dataLength / PRODUCT_PAGINATION_STEP);
    return totalPages;
  }, [dataLength]);

  return pagination;
};
