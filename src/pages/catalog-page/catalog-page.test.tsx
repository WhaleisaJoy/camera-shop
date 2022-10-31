import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { storeWithMiddlewares } from '../../utils/mockStore';
import CatalogPage from './catalog-page';

const history = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <CatalogPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
