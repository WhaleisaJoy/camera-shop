import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute, DEFAULT_PAGE, LoadingStatus } from '../../const';
import { DefaultCamera, DefaultPromo } from '../../database';
import { makeFakeCamera, makeFakeReview } from '../../utils/mock';
import thunk from 'redux-thunk';
import App from './app';
import { createAPI } from '../../services/api';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';

const fakeCamera = makeFakeCamera();
const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());

const initialStoreState = {
  DATA: {
    cameras: fakeCameras,
    currentCamera: DefaultCamera,
    promo: DefaultPromo,
    similar: fakeCameras,
    reviews: fakeReviews,
    isDataLoaded: false,
    isCurrentCameraLoaded: false,
    isPromoLoaded: false,
    isSimilarLoaded: false,
    isReviewsLoaded: false,
    reviewSendingStatus: LoadingStatus.Idle,
  },
};

const history = createMemoryHistory();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreWithMiddlewares = configureMockStore(middlewares);
const storeWithMiddlewares = mockStoreWithMiddlewares(initialStoreState);
const fakeAppWithMiddlewares = (
  <Provider store={storeWithMiddlewares}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeAppWithMiddlewares);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);
    render(fakeAppWithMiddlewares);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog/page-:id"', () => {
    history.push(`${AppRoute.CatalogPage}${DEFAULT_PAGE}`);
    render(fakeAppWithMiddlewares);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/catalog/product-:id"', () => {
    history.push(`${AppRoute.Catalog}${AppRoute.Product}${fakeCamera.id}`);

    const customStore = mockStoreWithMiddlewares({
      DATA: {
        currentCamera: fakeCamera,
        similar: fakeCameras,
        reviews: fakeReviews,
        isCurrentCameraLoaded: false,
        isSimilarLoaded: false,
        isReviewsLoaded: false,
      },
    });

    render(
      <Provider store={customStore}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: fakeCamera.name })).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeAppWithMiddlewares);

    expect(screen.getByText(/Запрашиваемая страница не найдена/i)).toBeInTheDocument();
  });
});
