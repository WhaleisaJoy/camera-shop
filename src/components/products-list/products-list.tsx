import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PRODUCT_PAGINATION_STEP } from '../../const';
import { getCamerasInBasket } from '../../store/basket-data/selectors';
import { Camera } from '../../types/camera';
import ProductsItem from '../products-item/products-item';

type ProductsListProps = {
  cameras: Camera[];
};

function ProductsList({ cameras }: ProductsListProps): JSX.Element {
  const { id = 1 } = useParams();
  const camerasInBasket = useSelector(getCamerasInBasket);

  const start = PRODUCT_PAGINATION_STEP * (+id - 1);
  const end = PRODUCT_PAGINATION_STEP * +id;

  return (
    <div className="cards catalog__cards" data-testid="cards">
      {
        cameras
          .slice(start, end)
          .map((camera) => {
            const isCameraInBasket = camerasInBasket.some((cameraInBasket) => camera.id === cameraInBasket.id);

            return (
              <ProductsItem
                key={camera.id}
                camera={camera}
                isCameraInBasket={isCameraInBasket}
              />
            );
          })
      }
    </div>
  );
}

export default ProductsList;


