import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import MainNavList from './main-nav-list';

const history = createMemoryHistory();

describe('Component: MainNavList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <MainNavList />
      </HistoryRouter>
    );

    expect(screen.getAllByRole('list').some((link) => link.classList.contains('main-nav__list'))).toBe(true);
  });
});
