import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mockStore';
import HistoryRouter from '../history-route/history-route';
import Reviews, { REVIEWS_STEP } from './reviews';

const history = createMemoryHistory();

const fakeId = datatype.number().toString();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <Reviews id={fakeId} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Отзывы' })).toBeInTheDocument();
  });

  it('should render only 3 reviews when first render', () => {
    const { container } = render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <Reviews id={fakeId} />
        </HistoryRouter>
      </Provider>
    );

    expect(container.querySelector('.review-block__list')?.childElementCount).toEqual(REVIEWS_STEP);
  });
});
