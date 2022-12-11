import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeCamera, makeFakeReview } from '../../utils/mock';
import ProductPage from './product-page';
import { NameSpace } from '../../const';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreWithMiddlewares = configureMockStore(middlewares);

const fakeCamera = makeFakeCamera();
const fakeCameras = [makeFakeCamera(), makeFakeCamera()];
const fakeReviews = [makeFakeReview(), makeFakeReview()];

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const customStore = mockStoreWithMiddlewares({
      [NameSpace.Cameras]: {
        currentCamera: fakeCamera,
        similar: fakeCameras,
        isCurrentCameraLoaded: false,
        isSimilarLoaded: false,
      },
      [NameSpace.Reviews]: {
        reviews: fakeReviews,
        isReviewsLoaded: false,
      },
      [NameSpace.Basket]: {
        camerasInBasket: [],
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <ProductPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: fakeCamera.name })).toBeInTheDocument();
  });

  it('should not render similar block if no similar cameras fetched', () => {
    const customStore = mockStoreWithMiddlewares({
      [NameSpace.Cameras]: {
        currentCamera: fakeCamera,
        similar: [],
        isCurrentCameraLoaded: false,
        isSimilarLoaded: false,
      },
      [NameSpace.Reviews]: {
        reviews: fakeReviews,
        isReviewsLoaded: false,
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <ProductPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Похожие товары/i)).not.toBeInTheDocument();
  });

  it('should not render reviews list if no reviews fetched', () => {
    const customStore = mockStoreWithMiddlewares({
      [NameSpace.Cameras]: {
        currentCamera: fakeCamera,
        similar: [],
        isCurrentCameraLoaded: false,
        isSimilarLoaded: false,
      },
      [NameSpace.Reviews]: {
        reviews: [],
        isReviewsLoaded: false,
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <ProductPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('review-block-list')).not.toBeInTheDocument();
  });
});
