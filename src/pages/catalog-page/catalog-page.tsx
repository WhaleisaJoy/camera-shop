import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Filter from '../../components/filter/filter';
import Pagination from '../../components/pagination/pagination';
import ProductsList from '../../components/products-list/products-list';
import Sort from '../../components/sort/sort';
import { BreadcrumbsSettings } from '../../database';
import { useAppDispatch } from '../../hooks';
import { usePagination } from '../../hooks/usePagination';
import { fetchCamerasAction, fetchPromoAction } from '../../store/api-actions';
import { getCameras, getLoadedDataStatus } from '../../store/data-reducer/selectors';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';

const BREADCRUMBS_SETTINGS = [
  BreadcrumbsSettings.Root,
  BreadcrumbsSettings.Catalog,
];

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const cameras = useSelector(getCameras);
  const isCamerasLoading = useSelector(getLoadedDataStatus);
  const totalPages = usePagination(cameras.length);

  if (isCamerasLoading) {
    return <LoadingPage />;
  }

  if (
    id && (
      +id > totalPages ||
      +id <= 0 ||
      !/^[0-9]*$/.test(id)
    )
  ) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Banner />

      <div className="page-content">
        <Breadcrumbs settings={BREADCRUMBS_SETTINGS} />

        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <Filter />
              </div>

              <div className="catalog__content">
                <Sort />
                <ProductsList cameras={cameras} />
                <Pagination totalPages={totalPages} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;

