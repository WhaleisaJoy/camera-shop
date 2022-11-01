import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>
    );

    expect(screen.getByText(/Запрашиваемая страница не найдена/i)).toBeInTheDocument();
  });

  it('should redirect to Root when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/'
            element={<h1>This is Root Page</h1>}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is Root Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is Root Page/i)).toBeInTheDocument();
  });
});
