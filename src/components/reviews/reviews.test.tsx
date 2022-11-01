import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import Reviews from './reviews';

const history = createMemoryHistory();

const fakeId = datatype.number().toString();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <Reviews id={fakeId} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Отзывы' })).toBeInTheDocument();
  });
});
