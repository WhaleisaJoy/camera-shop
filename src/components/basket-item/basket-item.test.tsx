import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import BasketItem from './basket-item';
import { Provider } from 'react-redux';
import { storeWithMiddlewares } from '../../utils/mock-store';

const history = createMemoryHistory();

const fakeCamera = makeFakeCamera();

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual<typeof import('react-redux')>('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <BasketItem
          camera={fakeCamera}
        />
      </HistoryRouter>
    );

    expect(screen.getByAltText(fakeCamera.name)).toBeInTheDocument();
  });

  it('should handle user input correctly', async () => {
    render(
      <Provider store={storeWithMiddlewares}>
        <HistoryRouter history={history}>
          <BasketItem
            camera={fakeCamera}
          />
        </HistoryRouter>
      </Provider>
    );

    const cameraCounterInput = screen.getByTestId('camera-counter-input');

    await userEvent.type(cameraCounterInput, '5');

    expect(cameraCounterInput).toHaveDisplayValue('5');
  });
});
