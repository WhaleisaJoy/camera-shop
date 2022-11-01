import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import SocialList from './social-list';

const history = createMemoryHistory();

describe('Component: SocialList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <SocialList />
      </HistoryRouter>
    );

    expect(screen.getByTestId('social')).toBeInTheDocument();
  });
});
