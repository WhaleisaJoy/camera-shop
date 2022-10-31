import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import BackToTop from './back-to-top';

const history = createMemoryHistory();

describe('Component: BackToTop', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <BackToTop />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('up-btn');
  });

  it('should invoke event handler when user clicked', async () => {
    render(
      <HistoryRouter history={history}>
        <BackToTop />
      </HistoryRouter>
    );

    const fakeBackToTopClickHandler = jest.fn();
    const backToTop = screen.getByRole('link');
    backToTop.onclick = fakeBackToTopClickHandler;

    await userEvent.click(backToTop);
    expect(fakeBackToTopClickHandler).toBeCalled();
  });
});
