import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import Banner from './banner';

const history = createMemoryHistory();

describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Профессиональная камера от известного производителя/i)).toBeInTheDocument();
  });
});
