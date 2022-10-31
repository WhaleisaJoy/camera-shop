import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import ReviewsItem from './reviews-item';

const history = createMemoryHistory();

const fakeReview = makeFakeReview();

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <ReviewsItem review={fakeReview} />
      </HistoryRouter>
    );

    expect(container.querySelector('.review-card')).toBeInTheDocument();
    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
  });
});
