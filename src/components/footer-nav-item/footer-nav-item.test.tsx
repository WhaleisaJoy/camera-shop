import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { makeFakeFooterNavSettings } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import FooterNavItem from './footer-nav-item';

const history = createMemoryHistory();

const fakeFooterNavSettings = makeFakeFooterNavSettings();

describe('Component: FooterNavItem', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FooterNavItem settings={fakeFooterNavSettings} />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeFooterNavSettings.Name)).toBeInTheDocument();
  });

  it('should redirect when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={fakeFooterNavSettings.Content[0].Url}
            element={<h1>This is Catalog Page</h1>}
          />
          <Route
            path="*"
            element={<FooterNavItem settings={fakeFooterNavSettings} />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is Catalog Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is Catalog Page/i)).toBeInTheDocument();
  });
});
