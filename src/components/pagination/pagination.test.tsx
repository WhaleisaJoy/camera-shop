import { render } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Pagination from './pagination';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const fakeTotalPages = datatype.number();

    const { container } = render(
      <HistoryRouter history={history}>
        <Pagination totalPages={fakeTotalPages} />
      </HistoryRouter>
    );

    expect(container.querySelector('.pagination')).toBeInTheDocument();
  });
});
