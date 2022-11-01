import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { storeWithMiddlewares } from '../../utils/mock-store';
import FormAddReview from './form-add-review';

const history = createMemoryHistory();

describe('Component: FormAddReview', () => {
  it('should render correctly', () => {
    const fakeId = datatype.number().toString();
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <FormAddReview id={fakeId} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });
});
