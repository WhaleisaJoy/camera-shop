import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import FilterPriceRange from './filter-price-range';

const history = createMemoryHistory();

describe('Component: FilterPriceRange', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <FilterPriceRange />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
  });
});
