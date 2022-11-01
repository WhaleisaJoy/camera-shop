import dayjs from 'dayjs';
import type { Review } from '../../types/review';
import Rating from '../rating/rating';

type ReviewsItemProps = {
  review: Review;
}

function ReviewsItem({ review }: ReviewsItemProps): JSX.Element {
  const {
    userName,
    createAt,
    rating,
    advantage,
    disadvantage,
    review: reviewText
  } = review;

  const date = dayjs(createAt);

  return (
    <li className="review-card" data-testid="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time
          className="review-card__data"
          dateTime={date.format()}
        >
          {date.format('DD MMMM')}
        </time>
      </div>

      {
        <Rating
          rating={rating}
          className={'review-card__rate'}
        />
      }

      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{reviewText}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewsItem;
