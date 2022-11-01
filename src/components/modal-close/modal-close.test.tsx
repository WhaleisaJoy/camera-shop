import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import ModalClose from './modal-close';

const history = createMemoryHistory();

const fakeCloseHandler = jest.fn();

describe('Component: ModalClose', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ModalClose handleCloseClick={fakeCloseHandler} />
      </HistoryRouter>
    );

    expect(screen.getByRole('button')).toHaveClass('cross-btn');
  });

  it('should invoke event handler when user clicked', async () => {
    render(
      <HistoryRouter history={history}>
        <ModalClose handleCloseClick={fakeCloseHandler} />
      </HistoryRouter>
    );

    expect(fakeCloseHandler).toBeCalledTimes(0);
    await userEvent.click(screen.getByRole('button'));
    expect(fakeCloseHandler).toBeCalledTimes(1);
  });
});
