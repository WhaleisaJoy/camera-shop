import { Link } from 'react-router-dom';

function BackToTop(): JSX.Element {
  return (
    <Link className="up-btn" to="#header">
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </Link>
  );
}

export default BackToTop;
