import './not-found-page.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {

  return (
    <main>
      <div className="page-content">
        <div className="page-content__section page-content__section--not-found">
          <h1>404</h1>
          <p>Запрашиваемая страница не найдена</p>
          <Link
            className='btn btn--transparent'
            to={AppRoute.Root}
          >
            Вернуться на главную страницу
          </Link>
        </div>
      </div >
    </main >
  );
}

export default NotFoundPage;
