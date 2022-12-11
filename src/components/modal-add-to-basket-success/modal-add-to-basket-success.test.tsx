import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import ModalAddToBasketSuccess from './modal-add-to-basket-success';

const history = createMemoryHistory();

describe('Component: ModalAddToBasketSuccess', () => {
  it('should render correctly', () => {
    const handleCloseClick = jest.fn();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ModalAddToBasketSuccess
            handleCloseClick={handleCloseClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});
