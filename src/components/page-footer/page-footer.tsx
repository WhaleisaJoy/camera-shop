import { Link } from 'react-router-dom';
import FooterNavList from '../footer-nav-list/footer-nav-list';
import SocialList from '../social-list/social-list';

function PageFooter(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to="index.html" aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <SocialList />
        </div>
        <FooterNavList />
      </div>
    </footer>
  );
}

export default PageFooter;
