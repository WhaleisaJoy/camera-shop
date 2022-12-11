import { MouseEvent } from 'react';

function BackToTop(): JSX.Element {
  const handleBackToTopClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      className="up-btn"
      href="#header"
      onClick={handleBackToTopClick}
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

export default BackToTop;
