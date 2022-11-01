import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { SocialSettings } from '../../database';
import HistoryRouter from '../history-router/history-router';
import SocialItem from './social-item';

const history = createMemoryHistory();

const fakeSocialSettings = {
  ...SocialSettings[0],
  Url: '/some-url',
};

describe('Component: SocialItem', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <SocialItem settings={fakeSocialSettings} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('social-item')).toBeInTheDocument();
  });

  it('should redirect when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={fakeSocialSettings.Url}
            element={<h1>This is Social Page</h1>}
          />
          <Route
            path="*"
            element={<SocialItem settings={fakeSocialSettings} />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is Social Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is Social Page/i)).toBeInTheDocument();
  });
});
