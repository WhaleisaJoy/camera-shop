import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Sort from './sort';

const history = createMemoryHistory();

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Sort />
      </HistoryRouter>
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
