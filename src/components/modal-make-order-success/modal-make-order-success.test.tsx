import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import ModalMakeOrderSuccess from './modal-make-order-success';

const history = createMemoryHistory();

describe('Component: ModalMakeOrderSuccess', () => {
  it('should render correctly', () => {
    const handleCloseClick = jest.fn();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ModalMakeOrderSuccess
            handleCloseClick={handleCloseClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  });
});
