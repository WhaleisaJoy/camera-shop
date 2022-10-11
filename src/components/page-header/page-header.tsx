import { Link } from 'react-router-dom';
import FormSearch from '../form-search/form-search';
import MainNavList from '../main-nav-list/main-nav-list';

function PageHeader(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to="index.html" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>

        <nav className="main-nav header__main-nav">
          <MainNavList />
        </nav>

        <FormSearch />

        <Link className="header__basket-link" to="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default PageHeader;
