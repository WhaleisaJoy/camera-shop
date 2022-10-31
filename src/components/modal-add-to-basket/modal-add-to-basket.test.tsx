import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera } from '../../utils/mock';
import { storeWithMiddlewares } from '../../utils/mockStore';
import HistoryRouter from '../history-route/history-route';
import ModalAddToBasket from './modal-add-to-basket';

const history = createMemoryHistory();

describe('Component: ModalAddReviewSuccess', () => {
  it('should render correctly', () => {
    const fakeCamera = makeFakeCamera();
    const handleCloseClick = jest.fn();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ModalAddToBasket camera={fakeCamera} handleCloseClick={handleCloseClick} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
});
