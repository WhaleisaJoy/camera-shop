import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import { formatPrce } from '../../utils/utils';
import ModalAddToBasketSuccess from '../modal-add-to-basket-success/modal-add-to-basket-success';
import ModalAddToBasket from '../modal-add-to-basket/modal-add-to-basket';
import Rating from '../rating/rating';

type ProductsItemProps = {
  camera: Camera;
  isActive?: boolean;
  isCameraInBasket: boolean;
};

function ProductsItem({ camera, isActive, isCameraInBasket }: ProductsItemProps): JSX.Element {
  const {
    id,
    name,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    rating,
    reviewCount } = camera;

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isAddProductSuccessModalOpen, setAddProductSuccessModalOpen] = useState(false);

  const handleAddProductModalToggle = () => setAddProductModalOpen((prevState) => !prevState);
  const handleAddProductSuccessModalToggle = () => setAddProductSuccessModalOpen((prevState) => !prevState);

  return (
    <>
      <div className={`product-card ${isActive ? 'is-active' : ''}`}>
        <div className="product-card__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
            />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x} 2x`}
              width="280"
              height="240"
              alt={name}
            />
          </picture>
        </div>
        <div className="product-card__info">
          <Rating rating={rating} reviewCount={reviewCount} />
          <p className="product-card__title">
            {name}
          </p>
          <p className="product-card__price">
            <span className="visually-hidden">
              Цена:
            </span>
            {`${formatPrce(price)} ₽`}
          </p>
        </div>
        <div className="product-card__buttons">

          {
            isCameraInBasket
              ?
              <Link
                className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
                to={AppRoute.Basket}
              >
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-basket"></use>
                </svg>
                В корзине
              </Link>
              :
              <button
                className="btn btn--purple product-card__btn"
                type="button"
                onClick={handleAddProductModalToggle}
              >
                Купить
              </button>
          }

          <Link
            className="btn btn--transparent"
            to={`${AppRoute.Catalog}${AppRoute.Product}${id}`}
          >
            Подробнее
          </Link>

        </div>
      </div>

      {
        isAddProductModalOpen &&
        <ModalAddToBasket
          camera={camera}
          handleCloseClick={handleAddProductModalToggle}
          setAddProductSuccessModalOpen={setAddProductSuccessModalOpen}
        />
      }

      { isAddProductSuccessModalOpen && <ModalAddToBasketSuccess handleCloseClick={handleAddProductSuccessModalToggle} /> }
    </>
  );
}

export default ProductsItem;


