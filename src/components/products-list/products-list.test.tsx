import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera } from '../../utils/mock';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import ProductsList from './products-list';

const history = createMemoryHistory();

const fakeCameras = new Array(15).fill(null).map(() => makeFakeCamera());

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ProductsList cameras={fakeCameras} />
        </HistoryRouter>
      </Provider>

    );

    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });
});
