import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ProductSimilar from './product-similar';

const history = createMemoryHistory();

const fakeCameras = new Array(6).fill(null).map(() => makeFakeCamera());

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductSimilar similarCameras={fakeCameras} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
