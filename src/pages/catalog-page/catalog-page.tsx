import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Filter from '../../components/filter/filter';
import Loader from '../../components/loader/loader';
import Pagination from '../../components/pagination/pagination';
import ProductsList from '../../components/products-list/products-list';
import Sort from '../../components/sort/sort';
import { QueryParams } from '../../const';
import { BreadcrumbsSettings } from '../../database';
import { useAppDispatch } from '../../hooks';
import { usePagination } from '../../hooks/usePagination';
import { fetchCamerasAction, fetchPromoAction } from '../../store/api-actions';
import { getCameras, getLoadedCamerasStatus } from '../../store/cameras-data/selectors';
import { getLoadedPromoStatus } from '../../store/promo-data/selectors';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';

const BREADCRUMBS_SETTINGS = [
  BreadcrumbsSettings.Root,
  BreadcrumbsSettings.Catalog,
];

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCamerasAction({
      sort: searchParams.get(QueryParams.Sort),
      order: searchParams.get(QueryParams.Order),
    }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const cameras = useSelector(getCameras);
  const isCamerasLoading = useSelector(getLoadedCamerasStatus);
  const isPromoLoading = useSelector(getLoadedPromoStatus);
  const totalPages = usePagination(cameras.length);

  if (!isMounted.current || isPromoLoading) {
    return <LoadingPage />;
  }

  if (
    !isCamerasLoading &&
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

                {
                  isCamerasLoading
                    ? <Loader />
                    : (
                      <>
                        <ProductsList cameras={cameras} />
                        <Pagination totalPages={totalPages} />
                      </>
                    )
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;

