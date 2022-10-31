import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './modal';

const fakeHandler = jest.fn();

describe('Component: Modal', () => {
  it('should render correctly', () => {
    render(
      <Modal handleClose={fakeHandler}>
        <div>Модальное окно</div>
      </Modal>
    );

    expect(screen.getByText('Модальное окно')).toBeInTheDocument();
  });

  it('should call onClose if user presses Esc', async () => {
    render(
      <Modal handleClose={fakeHandler}>
        <div>Модальное окно</div>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');

    expect(fakeHandler).toBeCalled();
  });
});
