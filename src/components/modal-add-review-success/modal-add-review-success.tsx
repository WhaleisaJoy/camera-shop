import ModalClose from '../modal-close/modal-close';
import Modal from '../modal/modal';

type ModalAddReviewSuccessProps = {
  handleCloseClick: () => void;
};

function ModalAddReviewSuccess({ handleCloseClick }: ModalAddReviewSuccessProps): JSX.Element {
  return (
    <Modal handleClose={handleCloseClick}>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>

            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleCloseClick}
              >
                Вернуться к покупкам
              </button>
            </div>

            <ModalClose handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddReviewSuccess;
