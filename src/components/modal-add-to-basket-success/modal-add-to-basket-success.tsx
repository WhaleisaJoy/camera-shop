import ModalClose from '../modal-close/modal-close';
import Modal from '../modal/modal';

type ModalAddToBasketSuccessProps = {
  handleCloseClick: () => void;
};

function ModalAddToBasketSuccess({ handleCloseClick }: ModalAddToBasketSuccessProps): JSX.Element {
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
                onClick={handleCloseClick}
              >
                Продолжить покупки
              </button>

              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
              >
                Перейти в корзину
              </button>
            </div>

            <ModalClose handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddToBasketSuccess;
