import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import ModalAddToBasket from '../modal-add-to-basket/modal-add-to-basket';
import Rating from '../rating/rating';

type ProductsItemProps = {
  camera: Camera;
};

function ProductsItem({ camera }: ProductsItemProps): JSX.Element {
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

  const [isModalOpen, setModalOpen] = useState(false);

  const handleMoreClick = () => setModalOpen((prevState) => !prevState);

  return (
    <>
      <div className="product-card">
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
            {`${price} ₽`}
          </p>
        </div>
        <div className="product-card__buttons">
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleMoreClick}
          >
            Купить
          </button>
          <Link
            className="btn btn--transparent"
            to={`${AppRoute.Catalog}${AppRoute.Product}${id}`}
          >
            Подробнее
          </Link>
        </div>
      </div>

      {
        isModalOpen && <ModalAddToBasket camera={camera} handleCloseClick={handleMoreClick} />
      }
    </>
  );
}

export default ProductsItem;


