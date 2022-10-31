import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import FormSearch from './form-search';

const history = createMemoryHistory();

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FormSearch />
      </HistoryRouter>
    );

    expect(screen.getByTestId('form-search'));
  });
});
