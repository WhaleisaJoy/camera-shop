import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { lorem } from 'faker/locale/ru';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import Rating from './rating';

const history = createMemoryHistory();

const fakeRatingProps = {
  rating: datatype.number(5),
  reviewCount: datatype.number(),
  className: lorem.word(),
};

describe('Component: Rating', () => {
  it('should render correctly if only rating prop received', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <Rating rating={fakeRatingProps.rating} />
      </HistoryRouter>
    );

    expect(container.querySelector('.rate')).toBeInTheDocument();
    expect(container.querySelector('.product-card__rate')).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${fakeRatingProps.rating}`)).toBeInTheDocument();
    expect(container.querySelector('.rate__count')).not.toBeInTheDocument();
  });

  it('should render correctly if rating and reviewCount props received', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <Rating rating={fakeRatingProps.rating} reviewCount={fakeRatingProps.reviewCount} />
      </HistoryRouter>
    );

    expect(container.querySelector('.rate__count')).toBeInTheDocument();
    expect(screen.getByText(fakeRatingProps.reviewCount)).toBeInTheDocument();
  });

  it('should render correctly if rating, reviewCount and className props received', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <Rating
          rating={fakeRatingProps.rating}
          reviewCount={fakeRatingProps.reviewCount}
          className={fakeRatingProps.className}
        />
      </HistoryRouter>
    );

    expect(container.querySelector('.product-card__rate')).not.toBeInTheDocument();
    expect(container.querySelector(`.${fakeRatingProps.className}`)).toBeInTheDocument();
  });
});
