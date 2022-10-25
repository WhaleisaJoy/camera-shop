import FormAddReview from '../form-add-review/form-add-review';
import ModalClose from '../modal-close/modal-close';
import Modal from '../modal/modal';

type ModalAddReviewProps = {
  id: string | undefined;
  handleCloseClick: () => void;
};

function ModalAddReview({ id, handleCloseClick }: ModalAddReviewProps): JSX.Element {
  return (
    <Modal handleClose={handleCloseClick}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCloseClick}></div>

          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>

            <div className="form-review">
              <FormAddReview id={id} />
            </div>

            <ModalClose handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddReview;
