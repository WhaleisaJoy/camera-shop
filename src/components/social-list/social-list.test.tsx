import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import SocialList from './social-list';

const history = createMemoryHistory();

describe('Component: SocialList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <SocialList />
      </HistoryRouter>
    );

    expect(container.querySelector('.social')).toBeInTheDocument();
  });
});
