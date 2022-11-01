import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ReviewsItem from './reviews-item';

const history = createMemoryHistory();

const fakeReview = makeFakeReview();

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ReviewsItem review={fakeReview} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('review-card')).toBeInTheDocument();
    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
  });
});
