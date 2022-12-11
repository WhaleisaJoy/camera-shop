import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getCamerasInBasketQuantity } from '../../store/basket-data/selectors';
import FormSearch from '../form-search/form-search';
import MainNavList from '../main-nav-list/main-nav-list';

function PageHeader(): JSX.Element {
  const camerasInBasketQuantity = useSelector(getCamerasInBasketQuantity);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>

        <nav className="main-nav header__main-nav">
          <MainNavList />
        </nav>

        <FormSearch />

        <Link data-testid="header-basket-link" className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {camerasInBasketQuantity > 0 &&
            <span data-testid="header-basket-count" className="header__basket-count">
              {camerasInBasketQuantity}
            </span>}
        </Link>
      </div>
    </header>
  );
}

export default PageHeader;
