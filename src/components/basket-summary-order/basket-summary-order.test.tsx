import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import BasketSummaryOrder from './basket-summary-order';

const history = createMemoryHistory();

describe('Component: BasketSummaryOrder', () => {
  it('should render correctly', () => {
    const fakeCoupon = lorem.word();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <BasketSummaryOrder coupon={fakeCoupon} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
  });
});
