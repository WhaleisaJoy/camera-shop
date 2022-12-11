import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { storeWithMiddlewares } from '../../utils/mock-store';
import BasketPage from './basket-page';

const history = createMemoryHistory();

describe('Component: BasketPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <BasketPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Корзина/i })).toBeInTheDocument();
  });
});
