import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Sort from './sort';

const history = createMemoryHistory();

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Sort />
      </HistoryRouter>
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });

  it('should handle user events correctly', async () => {
    render(
      <HistoryRouter history={history}>
        <Sort />
      </HistoryRouter>
    );

    const sortByPriceButton = screen.getByTestId('sort-price');
    const sortByPopularButton = screen.getByTestId('sort-popular');
    const orderByAscButton = screen.getByTestId('order-asc');
    const orderByDescButton = screen.getByTestId('order-desc');

    const fakeHandler = jest.fn();
    sortByPriceButton.onclick = fakeHandler;
    sortByPopularButton.onclick = fakeHandler;
    orderByAscButton.onclick = fakeHandler;
    orderByDescButton.onclick = fakeHandler;

    await userEvent.click(sortByPriceButton);
    expect(sortByPriceButton).toBeChecked();
    expect(sortByPopularButton).not.toBeChecked();
    expect(fakeHandler).toBeCalled();

    await userEvent.click(sortByPopularButton);
    expect(sortByPopularButton).toBeChecked();
    expect(sortByPriceButton).not.toBeChecked();
    expect(fakeHandler).toBeCalled();

    await userEvent.click(orderByAscButton);
    expect(orderByAscButton).toBeChecked();
    expect(orderByDescButton).not.toBeChecked();
    expect(fakeHandler).toBeCalled();

    await userEvent.click(orderByDescButton);
    expect(orderByDescButton).toBeChecked();
    expect(orderByAscButton).not.toBeChecked();
    expect(fakeHandler).toBeCalled();
  });
});
