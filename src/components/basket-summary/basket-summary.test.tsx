import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import BasketSummary from './basket-summary';

const history = createMemoryHistory();

describe('Component: BasketSummary', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <BasketSummary />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-summary')).toBeInTheDocument();
  });
});
