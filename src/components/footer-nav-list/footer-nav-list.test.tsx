import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import FooterNavList from './footer-nav-list';

const history = createMemoryHistory();

describe('Component: FooterNavList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FooterNavList />
      </HistoryRouter>
    );

    expect(screen.getAllByRole('list').some((link) => link.classList.contains('footer__nav'))).toBe(true);
  });
});
