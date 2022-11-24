import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import NoCameras from './no-cameras';

const history = createMemoryHistory();

describe('Component: NoCameras', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NoCameras />
      </HistoryRouter>
    );

    expect(screen.getByText(/По вашему запросу ничего не найдено/i)).toBeInTheDocument();
  });
});
