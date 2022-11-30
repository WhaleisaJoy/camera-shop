import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Filter from '../../components/filter/filter';
import Loader from '../../components/loader/loader';
import NoCameras from '../../components/no-cameras/no-cameras';
import Pagination from '../../components/pagination/pagination';
import ProductsList from '../../components/products-list/products-list';
import Sort from '../../components/sort/sort';
import { QueryParams } from '../../const';
import { BreadcrumbsSettings } from '../../database';
import { useAppDispatch } from '../../hooks';
import { useIsMounted } from '../../hooks/use-is-mounted';
import { usePagination } from '../../hooks/use-pagination';
import { fetchCamerasAction, fetchCamerasPriceRangeAction, fetchPromoAction } from '../../store/api-actions';
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
  const isMounted = useIsMounted();

  useEffect(() => {
    dispatch(fetchCamerasAction({
      sort: searchParams.get(QueryParams.Sort),
      order: searchParams.get(QueryParams.Order),
      priceFrom: searchParams.get(QueryParams.PriceFrom),
      priceTo: searchParams.get(QueryParams.PriceTo),
      [QueryParams.Category]: searchParams.get(QueryParams.Category),
      [QueryParams.Type]: searchParams.get(QueryParams.Type),
      [QueryParams.Level]: searchParams.getAll(QueryParams.Level),
    }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(fetchCamerasPriceRangeAction({
      [QueryParams.Category]: searchParams.get(QueryParams.Category),
      [QueryParams.Type]: searchParams.get(QueryParams.Type),
      [QueryParams.Level]: searchParams.getAll(QueryParams.Level),
    }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const cameras = useSelector(getCameras);
  const isCamerasLoading = useSelector(getLoadedCamerasStatus);
  const isPromoLoading = useSelector(getLoadedPromoStatus);
  const totalPages = usePagination(cameras.length);

  if (!isMounted || isPromoLoading) {
    return <LoadingPage />;
  }

  if (
    id && totalPages > 0 && (
      +id > totalPages ||
      +id <= 0 ||
      !/^[0-9]*$/.test(id)
    )
  ) {
    return <NotFoundPage />;
  }

  return (
    <main data-testid="catalog-page">
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

                { isCamerasLoading && <Loader /> }

                {
                  !isCamerasLoading && cameras.length
                    ? (
                      <>
                        <ProductsList cameras={cameras} />
                        <Pagination totalPages={totalPages} />
                      </>
                    )
                    : ''
                }

                { !isCamerasLoading && !cameras.length && <NoCameras /> }
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;

