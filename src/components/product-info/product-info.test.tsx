import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ProductInfo from './product-info';

const history = createMemoryHistory();

const fakeCamera = makeFakeCamera();

describe('Component: ProductInfo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductInfo camera={fakeCamera} />
      </HistoryRouter>
    );

    expect(screen.getByRole('heading', { name: fakeCamera.name })).toHaveClass('title--h3');
  });
});
