import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Sort from './sort';

const history = createMemoryHistory();

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Sort />
      </HistoryRouter>
    );

    expect(screen.queryByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
