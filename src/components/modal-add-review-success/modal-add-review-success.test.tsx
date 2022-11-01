import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
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
