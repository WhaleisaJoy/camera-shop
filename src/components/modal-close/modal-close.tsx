type ModalCloseProps = {
  handleCloseClick: () => void;
};

function ModalClose({ handleCloseClick }: ModalCloseProps): JSX.Element {
  return (
    <button
      className="cross-btn"
      type="button"
      aria-label="Закрыть попап"
      onClick={handleCloseClick}
    >
      <svg width="10" height="10" aria-hidden="true">
        <use xlinkHref="#icon-close"></use>
      </svg>
    </button>
  );
}

export default ModalClose;
