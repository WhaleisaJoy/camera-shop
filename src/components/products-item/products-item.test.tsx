import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ProductsItem from './products-item';

const history = createMemoryHistory();

const fakeCamera = makeFakeCamera();

describe('Component: ProductsItem', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductsItem
          camera={fakeCamera}
          isCameraInBasket
        />
      </HistoryRouter>
    );

    expect(screen.getByAltText(fakeCamera.name)).toBeInTheDocument();
  });

  it('should redirect to product page when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`/catalog/product-${fakeCamera.id}`}
            element={<h1>This is Product Page</h1>}
          />
          <Route
            path="*"
            element={<ProductsItem camera={fakeCamera} isCameraInBasket />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is Product Page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is Product Page/i)).toBeInTheDocument();
  });
});
