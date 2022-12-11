import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import BasketPromo from './basket-promo';

const history = createMemoryHistory();

describe('Component: BasketPromo', () => {
  it('should render correctly', () => {
    const fakeCoupon = lorem.word();
    const fakeSetCoupon = jest.fn();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <BasketPromo
            coupon={fakeCoupon}
            setCoupon={fakeSetCoupon}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
  });
});
