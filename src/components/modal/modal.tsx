import ReactDOM from 'react-dom';
import { ReactNode, useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import ReactFocusLock from 'react-focus-lock';
import { KeyCode } from '../../const';

type ModalProps = {
  children: ReactNode;
  handleClose: () => void;
  isAutoFocus?: boolean;
};

function Modal({ children, handleClose, isAutoFocus = false }: ModalProps): JSX.Element {
  let modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }

  useEffect(() => {
    const handleEscClick = (evt: KeyboardEvent) => {
      evt.key === KeyCode.Escape && handleClose();
    };

    window.addEventListener('keydown', handleEscClick);

    return () => window.removeEventListener('keydown', handleEscClick);
  }, [handleClose]);

  return ReactDOM.createPortal(
    <ReactFocusLock autoFocus={isAutoFocus}>
      <RemoveScroll>
        {children}
      </RemoveScroll>
    </ReactFocusLock>,
    modalRoot
  );
}

export default Modal;
