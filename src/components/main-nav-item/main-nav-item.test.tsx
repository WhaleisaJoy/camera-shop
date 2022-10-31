import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { MainNavSettings } from '../../database';
import HistoryRouter from '../history-route/history-route';
import MainNavItem from './main-nav-item';

const history = createMemoryHistory();

const fakeMainNavItemSettings = {
  name: MainNavSettings[0].Name,
  url: MainNavSettings[0].Url,
};

describe('Component: MainNavItem', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <MainNavItem
          name={fakeMainNavItemSettings.name}
          url={fakeMainNavItemSettings.url}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeMainNavItemSettings.name)).toBeInTheDocument();
  });

  it('should redirect when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={fakeMainNavItemSettings.url}
            element={<h1>This is Another Page</h1>}
          />
          <Route
            path="*"
            element={<MainNavItem
              name={fakeMainNavItemSettings.name}
              url={fakeMainNavItemSettings.url}
            />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is Another Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is Another Page/i)).toBeInTheDocument();
  });
});
