import { RatingSettings } from '../../database';

type RatingProps = {
  rating: number;
  reviewCount: number;
};

function Rating({ rating, reviewCount }: RatingProps): JSX.Element {
  return (
    <div className="rate product-card__rate">

      {
        RatingSettings.map(({ Value, Name }) => {
          const href = Value <= rating ? '#icon-full-star' : '#icon-star';

          return (
            <svg
              key={Name}
              width="17"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref={href}></use>
            </svg>
          );
        })
      }

      <p className="visually-hidden">
        {`Рейтинг: ${rating}`}
      </p>
      <p className="rate__count">
        <span className="visually-hidden">
          Всего оценок:
        </span>
        {reviewCount}
      </p>
    </div>
  );
}

export default Rating;
