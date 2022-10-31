import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Filter from './filter';

const history = createMemoryHistory();

describe('Component: Filter', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Filter />
      </HistoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Фильтр' }));
  });
});
