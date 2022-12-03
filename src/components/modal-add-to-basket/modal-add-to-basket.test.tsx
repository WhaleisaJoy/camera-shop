import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera } from '../../utils/mock';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import ModalAddToBasket from './modal-add-to-basket';

const history = createMemoryHistory();

describe('Component: ModalAddReviewSuccess', () => {
  it('should render correctly', () => {
    const fakeCamera = makeFakeCamera();
    const handleCloseClick = jest.fn();
    const setAddProductSuccessModalOpen = jest.fn();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ModalAddToBasket
            camera={fakeCamera}
            handleCloseClick={handleCloseClick}
            setAddProductSuccessModalOpen={setAddProductSuccessModalOpen}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
});
