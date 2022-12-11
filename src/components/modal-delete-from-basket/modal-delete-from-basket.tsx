import { useAppDispatch } from '../../hooks';
import { deleteFromBasket } from '../../store/basket-data/basket-data';
import type { Camera } from '../../types/camera';
import ModalClose from '../modal-close/modal-close';
import Modal from '../modal/modal';

type ModalDeleteFromBasketProps = {
  camera: Camera;
  handleCloseClick: () => void;
};

function ModalDeleteFromBasket({ camera, handleCloseClick }: ModalDeleteFromBasketProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    id,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    category,
    level } = camera;

  const handleDeleteFromBasketClick = () => {
    dispatch(deleteFromBasket(id));
    handleCloseClick();
  };

  return (
    <Modal handleClose={handleCloseClick}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>

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
              </div>
            </div>

            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={handleDeleteFromBasketClick}
              >
                Удалить
              </button>

              <button
                className="btn btn--transparent modal__btn modal__btn--half-width"
                type="button"
                onClick={handleCloseClick}
              >
                Продолжить покупки
              </button>
            </div>

            <ModalClose handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDeleteFromBasket;
