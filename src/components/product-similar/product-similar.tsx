import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCamerasInBasket } from '../../store/basket-data/selectors';
import type { Camera } from '../../types/camera';
import ProductsItem from '../products-item/products-item';

type ProductSimilarProps = {
  similarCameras: Camera[];
};

export const PRODUCT_SIMILAR_STEP = 3;

function ProductSimilar({ similarCameras }: ProductSimilarProps): JSX.Element {
  const camerasInBasket = useSelector(getCamerasInBasket);

  const [shownSimilarCameras, setShownSimilarCameras] = useState<number>(PRODUCT_SIMILAR_STEP);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {
              similarCameras
                .slice(shownSimilarCameras - PRODUCT_SIMILAR_STEP, shownSimilarCameras)
                .map((camera) => {
                  const isCameraInBasket = camerasInBasket.some((cameraInBasket) => camera.id === cameraInBasket.id);

                  return (
                    <ProductsItem
                      key={camera.id}
                      camera={camera}
                      isCameraInBasket={isCameraInBasket}
                      isActive
                    />
                  );
                })
            }
          </div>

          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            onClick={() => setShownSimilarCameras((prevState) => prevState - PRODUCT_SIMILAR_STEP)}
            disabled={shownSimilarCameras === PRODUCT_SIMILAR_STEP}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            onClick={() => setShownSimilarCameras((prevState) => prevState + PRODUCT_SIMILAR_STEP)}
            disabled={shownSimilarCameras >= similarCameras.length}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSimilar;
