import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import ProductSimilar, { PRODUCT_SIMILAR_STEP } from './product-similar';

const history = createMemoryHistory();

const fakeCameras = new Array(6).fill(null).map(() => makeFakeCamera());

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <ProductSimilar similarCameras={fakeCameras} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(container.querySelector('.product-similar__slider-list')?.childElementCount).toEqual(PRODUCT_SIMILAR_STEP);
  });
});
