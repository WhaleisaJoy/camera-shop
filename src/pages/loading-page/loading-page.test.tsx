import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import LoadingPage from './loading-page';

const history = createMemoryHistory();

describe('Component: LoadingPage', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <LoadingPage />
      </HistoryRouter>
    );

    expect(screen.getByAltText(/Loader/i)).toBeInTheDocument();
  });
});
