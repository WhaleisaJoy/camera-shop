import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { lorem } from 'faker/locale/ru';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Rating from './rating';

const history = createMemoryHistory();

const fakeRatingProps = {
  rating: datatype.number(5),
  reviewCount: datatype.number(),
  className: lorem.word(),
};

describe('Component: Rating', () => {
  it('should render correctly if only rating prop received', () => {
    render(
      <HistoryRouter history={history}>
        <Rating rating={fakeRatingProps.rating} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('rate')).toBeInTheDocument();
    expect(screen.getByTestId('rate')).toHaveClass('product-card__rate');
    expect(screen.getByText(`Рейтинг: ${fakeRatingProps.rating}`)).toBeInTheDocument();
    expect(screen.queryByText(/Всего оценок:/i)).not.toBeInTheDocument();
  });

  it('should render correctly if rating and reviewCount props received', () => {
    render(
      <HistoryRouter history={history}>
        <Rating rating={fakeRatingProps.rating} reviewCount={fakeRatingProps.reviewCount} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(fakeRatingProps.reviewCount)).toBeInTheDocument();
  });

  it('should render correctly if rating, reviewCount and className props received', () => {
    render(
      <HistoryRouter history={history}>
        <Rating
          rating={fakeRatingProps.rating}
          reviewCount={fakeRatingProps.reviewCount}
          className={fakeRatingProps.className}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('rate')).not.toHaveClass('product-card__rate');
    expect(screen.getByTestId('rate')).toHaveClass(`${fakeRatingProps.className}`);
  });
});
