import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute, DEFAULT_PAGE, NameSpace } from '../../const';
import { makeFakeCamera, makeFakeReview } from '../../utils/mock';
import App from './app';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { mockStoreWithMiddlewares, storeWithMiddlewares } from '../../utils/mock-store';

const fakeCamera = makeFakeCamera();
const fakeCameras = new Array(3).fill(null).map(() => makeFakeCamera());
const fakeSearchCameras = [makeFakeCamera()];
const fakeReviews = new Array(3).fill(null).map(() => makeFakeReview());

const history = createMemoryHistory();

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
      [NameSpace.Basket]: {
        camerasInBasket: [],
      },
      [NameSpace.Cameras]: {
        currentCamera: fakeCamera,
        similar: fakeCameras,
        isCamerasLoaded: false,
        isCurrentCameraLoaded: false,
        isSimilarLoaded: false,
      },
      [NameSpace.Reviews]: {
        reviews: fakeReviews,
        isReviewsLoaded: false,
      },
      [NameSpace.Search]: {
        camerasBySearch: fakeSearchCameras,
        isCamerasBySearchLoaded: false,
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

  it('should render "BasketPage" when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);
    render(fakeAppWithMiddlewares);

    expect(screen.getByRole('heading', { name: /Корзина/i })).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeAppWithMiddlewares);

    expect(screen.getByText(/Запрашиваемая страница не найдена/i)).toBeInTheDocument();
  });
});
