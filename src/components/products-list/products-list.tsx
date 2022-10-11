import { useSelector } from 'react-redux';
import { getCameras } from '../../store/data-reducer/selectors';
import ProductsItem from '../products-item/products-item';

function ProductsList(): JSX.Element {
  const cameras = useSelector(getCameras).slice(0, 9);

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


