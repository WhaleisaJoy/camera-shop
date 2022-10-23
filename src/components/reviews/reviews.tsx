import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import { getSortedReviews } from '../../store/data-reducer/selectors';
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

  const [shownReviews, setShownReviews] = useState(REVIEWS_STEP);
  const reviews = useSelector(getSortedReviews);

  const isShowMore = shownReviews < reviews.length;
  const handleShowMoreClick = () => setShownReviews((prevState) => prevState + REVIEWS_STEP);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
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
      </div>
    </section>
  );
}

export default Reviews;
