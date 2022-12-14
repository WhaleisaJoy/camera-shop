import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackToTop from '../../components/back-to-top/back-to-top';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductInfo from '../../components/product-info/product-info';
import ProductSimilar from '../../components/product-similar/product-similar';
import Reviews from '../../components/reviews/reviews';
import { BreadcrumbsSettings } from '../../database';
import { useAppDispatch } from '../../hooks';
import { fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCurrentCamera, getLoadedCurrentCameraStatus, getLoadedSimilarStatus, getSimilar } from '../../store/cameras-data/selectors';
import LoadingPage from '../loading-page/loading-page';

const BREADCRUMBS_SETTINGS = [
  BreadcrumbsSettings.Root,
  BreadcrumbsSettings.Catalog,
];

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams<string>();

  useEffect(() => {
    id && dispatch(fetchCurrentCameraAction(id));
    id && dispatch(fetchSimilarCamerasAction(id));
  }, [id, dispatch]);

  const currentCamera = useSelector(getCurrentCamera);
  const similarCameras = useSelector(getSimilar);

  const isCurrentCameraLoading = useSelector(getLoadedCurrentCameraStatus);
  const isSimilarLoading = useSelector(getLoadedSimilarStatus);

  if (isCurrentCameraLoading || isSimilarLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs settings={[...BREADCRUMBS_SETTINGS, { Name: currentCamera.name }]} />

          <div className="page-content__section">
            <ProductInfo camera={currentCamera} />
          </div>

          {
            similarCameras.length > 0 && (
              <div className="page-content__section">
                <ProductSimilar similarCameras={similarCameras} />
              </div>
            )
          }

          <div className="page-content__section">
            <Reviews id={id} />
          </div>
        </div >
      </main >

      <BackToTop />
    </>
  );
}

export default ProductPage;
