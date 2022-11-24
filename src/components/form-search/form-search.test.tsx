import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';
import HistoryRouter from '../history-router/history-router';
import FormSearch from './form-search';
import * as Redux from 'react-redux';

const history = createMemoryHistory();

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual<typeof import('react-redux')>('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });

  it('should handle user input correctly', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input');

    await userEvent.type(searchInput, 'van');

    expect(searchInput).toHaveDisplayValue('van');
    expect(useDispatch).toBeCalledTimes(1);
  });
});
