import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FooterNavSettings } from '../../database';
import HistoryRouter from '../history-route/history-route';
import FooterNavList from './footer-nav-list';

const history = createMemoryHistory();

describe('Component: FooterNavList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <FooterNavList />
      </HistoryRouter>
    );

    expect(screen.getAllByRole('list').some((link) => link.classList.contains('footer__nav'))).toBe(true);
    expect(container.querySelectorAll('.footer__nav-item').length).toEqual(FooterNavSettings.length);
  });
});
