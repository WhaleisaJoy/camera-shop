import { useAppDispatch } from '../../hooks';
import { addToBasket } from '../../store/basket-data/basket-data';
import type { Camera } from '../../types/camera';
import { formatPrce } from '../../utils/utils';
import ModalClose from '../modal-close/modal-close';
import Modal from '../modal/modal';

type ModalAddToBasketProps = {
  camera: Camera;
  handleCloseClick: () => void;
  setAddProductSuccessModalOpen: (value: React.SetStateAction<boolean>) => void;
};

function ModalAddToBasket({ camera, handleCloseClick, setAddProductSuccessModalOpen }: ModalAddToBasketProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    name,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    category,
    level } = camera;

  const handleAddToBasketClick = () => {
    dispatch(addToBasket(camera));
    handleCloseClick();
    setAddProductSuccessModalOpen(true);
  };

  return (
    <Modal handleClose={handleCloseClick}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={handleCloseClick}
          >
          </div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                  />
                  <img
                    src={`/${previewImg}`}
                    srcSet={`/${previewImg2x} 2x`}
                    width="140"
                    height="120"
                    alt={name}
                  />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул: </span>
                    <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{`${type} ${category.toLowerCase()}`}</li>
                  <li className="basket-item__list-item">{`${level} уровень`}</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>
                  {`${formatPrce(price)} ₽`}
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleAddToBasketClick}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>
                Добавить в корзину
              </button>
            </div>

            <ModalClose handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddToBasket;
