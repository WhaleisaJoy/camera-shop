import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PRODUCT_PAGINATION_STEP } from '../../const';
import { getCameras } from '../../store/data-reducer/selectors';
import ProductsItem from '../products-item/products-item';

function ProductsList(): JSX.Element {
  const { id = 1 } = useParams();

  // if (!id) {
  //   return <div></div>;
  // }

  const start = PRODUCT_PAGINATION_STEP * (+id - 1);
  const end = PRODUCT_PAGINATION_STEP * +id;
  const cameras = useSelector(getCameras).slice(start, end);

  return (
    <div className="cards catalog__cards">
      {
        cameras.map((camera) => (
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


