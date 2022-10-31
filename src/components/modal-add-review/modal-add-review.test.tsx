import { render, screen } from '@testing-library/react';
import { lorem } from 'faker/locale/ru';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mockStore';
import HistoryRouter from '../history-route/history-route';
import ModalAddReview from './modal-add-review';

const history = createMemoryHistory();

describe('Component: ModalAddReview', () => {
  it('should render correctly', () => {
    const { id, handleCloseClick } = {
      id: lorem.word(),
      handleCloseClick: jest.fn(),
    };

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ModalAddReview
            id={id}
            handleCloseClick={handleCloseClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});
