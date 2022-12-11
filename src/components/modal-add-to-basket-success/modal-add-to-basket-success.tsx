import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import ModalClose from '../modal-close/modal-close';
import Modal from '../modal/modal';

type ModalAddToBasketSuccessProps = {
  handleCloseClick: () => void;
  handleContinueShoppingClick?: () => void;
};

function ModalAddToBasketSuccess({ handleCloseClick, handleContinueShoppingClick = handleCloseClick }: ModalAddToBasketSuccessProps): JSX.Element {
  return (
    <Modal handleClose={handleCloseClick}>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>

            <div className="modal__buttons">
              <button
                className="btn btn--transparent modal__btn modal__btn--fit-width"
                onClick={handleContinueShoppingClick}
              >
                Продолжить покупки
              </button>

              <Link
                className="btn btn--purple modal__btn modal__btn--fit-width"
                to={AppRoute.Basket}
              >
                Перейти в корзину
              </Link>
            </div>

            <ModalClose handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddToBasketSuccess;
