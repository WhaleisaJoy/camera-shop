import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import ModalClose from '../modal-close/modal-close';
import Modal from '../modal/modal';

type ModalMakeOrderSuccessProps = {
  handleCloseClick: () => void;
};

function ModalMakeOrderSuccess({ handleCloseClick }: ModalMakeOrderSuccessProps): JSX.Element {
  return (
    <Modal handleClose={handleCloseClick}>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>

            <div className="modal__buttons">
              <Link
                className="btn btn--purple modal__btn modal__btn--fit-width"
                to={AppRoute.Catalog}
              >
                Вернуться к покупкам
              </Link>
            </div>

            <ModalClose handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalMakeOrderSuccess;
