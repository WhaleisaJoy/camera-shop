import { render, screen } from '@testing-library/react';
import { lorem } from 'faker/locale/ru';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mockStore';
import HistoryRouter from '../history-route/history-route';
import ModalAddReviewSuccess from './modal-add-review-success';

const history = createMemoryHistory();

describe('Component: ModalAddReviewSuccess', () => {
  it('should render correctly', () => {
    const handleCloseClick = jest.fn();

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <ModalAddReviewSuccess handleCloseClick={handleCloseClick} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });
});
