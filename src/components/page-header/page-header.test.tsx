import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import PageHeader from './page-header';

const history = createMemoryHistory();

describe('Component: PageHeader', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <PageHeader />
      </HistoryRouter>
    );

    expect(container.querySelector('.header')).toBeInTheDocument();
  });

  it('should redirect to Root when user clicked to logo link', async () => {
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
            element={<PageHeader />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is Root Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/Переход на главную/i));
    expect(screen.getByText(/This is Root Page/i)).toBeInTheDocument();
  });
});
