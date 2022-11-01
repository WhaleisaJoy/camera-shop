import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import ProductTabs from './product-tabs';

const history = createMemoryHistory();

const fakeCamera = makeFakeCamera();

describe('Component: ProductTabs', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductTabs camera={fakeCamera} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Характеристики' })).toHaveClass('is-active');
  });

  it('should change tab when user click', async () => {
    render(
      <HistoryRouter history={history}>
        <ProductTabs camera={fakeCamera} />
      </HistoryRouter>
    );

    const feauturesButton = screen.getByRole('button', { name: 'Характеристики' });
    const descriptionButton = screen.getByRole('button', { name: 'Описание' });

    expect(feauturesButton).toHaveClass('is-active');
    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
    await userEvent.click(descriptionButton);
    expect(feauturesButton).not.toHaveClass('is-active');
    expect(descriptionButton).toHaveClass('is-active');
  });
});
