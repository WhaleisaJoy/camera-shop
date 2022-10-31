import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import IconSnowflake from './icon-snowflake';

const history = createMemoryHistory();

describe('Component: IconSnowflake', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <IconSnowflake />
      </HistoryRouter>
    );

    expect(screen.getByTestId('icon-snowflake'));
  });
});
