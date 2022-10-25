import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import { setReviewSendingStatus } from '../../store/data-reducer/data-reducer';
import { getReviewSendingStatus, getSortedReviews } from '../../store/data-reducer/selectors';
import ModalAddReviewSuccess from '../modal-add-review-success/modal-add-review-success';
import ModalAddReview from '../modal-add-review/modal-add-review';
import ReviewsItem from '../reviews-item/reviews-item';

type ReviewsProps = {
  id: string | undefined;
}

const REVIEWS_STEP = 3;

function Reviews({ id }: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(fetchReviewsAction(id));
  }, [id, dispatch]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [shownReviews, setShownReviews] = useState(REVIEWS_STEP);

  const reviews = useSelector(getSortedReviews);
  const reviewSendingStatus = useSelector(getReviewSendingStatus);
  const isShowMore = shownReviews < reviews.length;

  const handleToggleModal = () => {
    setModalOpen((prevState) => !prevState);
    dispatch(setReviewSendingStatus(LoadingStatus.Idle));
  };
  const handleShowMoreClick = () => setShownReviews((prevState) => prevState + REVIEWS_STEP);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            className="btn"
            type="button"
            onClick={handleToggleModal}
          >
            Оставить свой отзыв
          </button>
        </div>

        {
          reviews.length > 0 && (
            <ul className="review-block__list">
              {
                reviews
                  .slice(0, shownReviews)
                  .map((review) => <ReviewsItem key={review.id} review={review} />)
              }
            </ul>
          )
        }

        {
          isShowMore && (
            <div className="review-block__buttons">
              <button
                className="btn btn--purple"
                type="button"
                onClick={handleShowMoreClick}
              >
                Показать больше отзывов
              </button>
            </div>
          )
        }

        {
          isModalOpen && (
            reviewSendingStatus === LoadingStatus.Fulfilled
              ? <ModalAddReviewSuccess handleCloseClick={handleToggleModal} />
              : <ModalAddReview id={id} handleCloseClick={handleToggleModal} />
          )
        }
      </div>
    </section>
  );
}

export default Reviews;
