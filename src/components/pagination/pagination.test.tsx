import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagination';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const fakeTotalPages = datatype.number();

    render(
      <HistoryRouter history={history}>
        <Pagination totalPages={fakeTotalPages} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
