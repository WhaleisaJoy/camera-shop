import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';

type PaginationProps = {
  totalPages: number;
};

function Pagination({ totalPages }: PaginationProps): JSX.Element {
  const { id = 1 } = useParams();

  return (
    <div className="pagination">
      <ul className="pagination__list">

        {
          +id !== 1 && (
            <li className="pagination__item">
              <Link
                className="pagination__link pagination__link--text"
                to={`${AppRoute.Catalog}${+id - 1}`}
              >
                Назад
              </Link>
            </li>
          )
        }

        {
          new Array(totalPages).fill('').map((_, index) => {
            const count = index + 1;
            const classActive = count === +id ? 'pagination__link--active' : '';

            return (
              <li key={`page-${count}`} className="pagination__item">
                <Link
                  className={`pagination__link ${classActive}`}
                  to={`${AppRoute.Catalog}${count}`}
                >
                  {count}
                </Link>
              </li>
            );
          })
        }

        {
          +id !== totalPages && (
            <li className="pagination__item">
              <Link
                className="pagination__link pagination__link--text"
                to={`${AppRoute.Catalog}${+id + 1}`}
              >
                Далее
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default Pagination;
