import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { AppRoute, PRODUCT_PAGINATION_STEP } from '../../const';
import { AppRoute } from '../../const';
// import { getCameras } from '../../store/data-reducer/selectors';
import { setCurrentPage } from '../../store/pagination-reducer/pagination-reducer';
import { getCurrentPage } from '../../store/pagination-reducer/selectors';

type PaginationProps = {
  totalPages: number;
};

function Pagination({ totalPages }: PaginationProps): JSX.Element {
  // const { id = 1 } = useParams();
  const dispatch = useDispatch();

  const currentPage = useSelector(getCurrentPage);
  // const camerasLength = useSelector(getCameras).length;
  // const pagesCount = Math.ceil(camerasLength / PRODUCT_PAGINATION_STEP);

  const handlePaginationClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">

        {
          currentPage !== 1 && (
            <li className="pagination__item">
              <Link
                className="pagination__link pagination__link--text"
                onClick={() => handlePaginationClick(currentPage - 1)}
                to={`${AppRoute.Catalog}${currentPage - 1}`}
              >
                Назад
              </Link>
            </li>
          )
        }

        {
          new Array(totalPages).fill('').map((_, index) => {
            const count = index + 1;
            const classActive = count === currentPage ? 'pagination__link--active' : '';

            return (
              <li key={`page-${count}`} className="pagination__item">
                <Link
                  className={`pagination__link ${classActive}`}
                  onClick={() => handlePaginationClick(count)}
                  to={`${AppRoute.Catalog}${count}`}
                >
                  {count}
                </Link>
              </li>
            );
          })
        }

        {
          currentPage !== totalPages && (
            <li className="pagination__item">
              <Link
                className="pagination__link pagination__link--text"
                onClick={() => handlePaginationClick(currentPage + 1)}
                to={`${AppRoute.Catalog}${currentPage + 1}`}
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
