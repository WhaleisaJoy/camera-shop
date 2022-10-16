import { useSelector } from 'react-redux';
import { PRODUCT_PAGINATION_STEP } from './const';
import { getCameras } from './store/data-reducer/selectors';

export const getTotalPagesCount = () => {
  const camerasLength = useSelector(getCameras).length;
  const pagesCount = Math.ceil(camerasLength / PRODUCT_PAGINATION_STEP);

  return pagesCount;
};
