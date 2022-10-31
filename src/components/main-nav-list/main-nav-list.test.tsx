import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MainNavSettings } from '../../database';
import HistoryRouter from '../history-route/history-route';
import MainNavList from './main-nav-list';

const history = createMemoryHistory();

describe('Component: MainNavList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <MainNavList />
      </HistoryRouter>
    );

    expect(screen.getAllByRole('list').some((link) => link.classList.contains('main-nav__list'))).toBe(true);
    expect(container.querySelectorAll('.main-nav__item').length).toEqual(MainNavSettings.length);
  });
});
