import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera } from '../../utils/mock';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import ModalDeleteFromBasket from './modal-delete-from-basket';

const history = createMemoryHistory();

const fakeCamera = makeFakeCamera();

describe('Component: ModalDeleteFromBasket', () => {
  it('should render correctly', () => {
    const handleCloseClick = jest.fn();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ModalDeleteFromBasket
            camera={fakeCamera}
            handleCloseClick={handleCloseClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });
});
