import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import HistoryRouter from '../history-router/history-router';
import BasketList from './basket-list';
import { DEFAULT_COUPON_DISCOUNT, LoadingStatus, NameSpace } from '../../const';
import { makeFakeCamera } from '../../utils/mock';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreWithMiddlewares = configureMockStore(middlewares);

const fakeCamera = makeFakeCamera();

describe('Component: BasketList', () => {
  it('should render correctly when camerasInBasket is empty', () => {
    const customStore = mockStoreWithMiddlewares({
      [NameSpace.Basket]: {
        camerasInBasket: [],
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <BasketList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/В корзине пока пусто/i)).toBeInTheDocument();
  });

  it('should render correctly when camerasInBasket is not empty', () => {
    const customStore = mockStoreWithMiddlewares({
      [NameSpace.Basket]: {
        camerasInBasket: [{...fakeCamera, quantity: 2}],
        couponDiscount: DEFAULT_COUPON_DISCOUNT,
        couponSendingStatus: LoadingStatus.Idle,
        orderSendingStatus: LoadingStatus.Idle,
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <BasketList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-list')).toBeInTheDocument();
  });
});
