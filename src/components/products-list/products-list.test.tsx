import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { PRODUCT_PAGINATION_STEP } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import ProductsList from './products-list';

const history = createMemoryHistory();

const fakeCameras = new Array(15).fill(null).map(() => makeFakeCamera());

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <ProductsList cameras={fakeCameras} />
      </HistoryRouter>
    );

    expect(container.querySelector('.cards')).toBeInTheDocument();
  });

  it('should render only 9 product cards', () => {
    const { container } = render(
      <HistoryRouter history={history}>
        <ProductsList cameras={fakeCameras} />
      </HistoryRouter>
    );

    expect(container.querySelector('.cards')?.childElementCount).toEqual(PRODUCT_PAGINATION_STEP);
  });
});
