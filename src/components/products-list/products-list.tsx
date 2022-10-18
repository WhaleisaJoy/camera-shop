import { useParams } from 'react-router-dom';
import { PRODUCT_PAGINATION_STEP } from '../../const';
import { Camera } from '../../types/camera';
import ProductsItem from '../products-item/products-item';

type ProductsListProps = {
  cameras: Camera[];
};

function ProductsList({ cameras }: ProductsListProps): JSX.Element {
  const { id = 1 } = useParams();

  const start = PRODUCT_PAGINATION_STEP * (+id - 1);
  const end = PRODUCT_PAGINATION_STEP * +id;

  return (
    <div className="cards catalog__cards">
      {
        cameras
          .slice(start, end)
          .map((camera) => (
            <ProductsItem
              key={camera.id}
              camera={camera}
            />
          ))
      }
    </div>
  );
}

export default ProductsList;


