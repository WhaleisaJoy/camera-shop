import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import Filter from './filter';

const history = createMemoryHistory();

describe('Component: Filter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <Filter />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Фильтр' })).toBeInTheDocument();
  });
});
