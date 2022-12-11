import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import PageHeader from './page-header';
import { makeFakeCamera } from '../../utils/mock';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreWithMiddlewares = configureMockStore(middlewares);

const fakeCameraWithQuantity = {...makeFakeCamera(), quantity: 1};

describe('Component: PageHeader', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <PageHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('banner')).toHaveClass('header');
  });

  it('should render correctly when camerasInBasketQuantity > 0', () => {
    const customStore = mockStoreWithMiddlewares({
      [NameSpace.Basket]: {
        camerasInBasket: [fakeCameraWithQuantity],
      },
      [NameSpace.Search]: {
        camerasBySearch: [makeFakeCamera()],
        isCamerasBySearchLoaded: false,
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <PageHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header-basket-count')).toBeInTheDocument();
  });

  it('should render correctly when camerasInBasketQuantity = 0', () => {
    const customStore = mockStoreWithMiddlewares({
      [NameSpace.Basket]: {
        camerasInBasket: [],
      },
      [NameSpace.Search]: {
        camerasBySearch: [makeFakeCamera()],
        isCamerasBySearchLoaded: false,
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <PageHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('header-basket-count')).not.toBeInTheDocument();
  });

  it('should redirect to Root when user clicked to logo link', async () => {
    history.push('/fake');

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is Root Page</h1>}
            />
            <Route
              path="*"
              element={<PageHeader />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is Root Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/Переход на главную/i));
    expect(screen.getByText(/This is Root Page/i)).toBeInTheDocument();
  });

  it('should redirect to Basket when user clicked to basket link', async () => {
    history.push('/fake');

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Basket}
              element={<h1>This is Basket Page</h1>}
            />
            <Route
              path="*"
              element={<PageHeader />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is Basket Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('header-basket-link'));
    expect(screen.getByText(/This is Basket Page/i)).toBeInTheDocument();
  });
});
