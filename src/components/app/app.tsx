import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../const';
import Catalog from '../../pages/catalog-page/catalog-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductPage from '../../pages/product-page/product-page';
import PageFooter from '../page-footer/page-footer';
import PageHeader from '../page-header/page-header';

const GO_TO_DEFAULT_PAGE = <Navigate to={`${AppRoute.CatalogPage}${DEFAULT_PAGE}`} />;

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <PageHeader />

      <Routes>
        <Route path={AppRoute.Root} element={GO_TO_DEFAULT_PAGE} />
        <Route path={AppRoute.Catalog} element={GO_TO_DEFAULT_PAGE} />
        <Route path={`${AppRoute.CatalogPage}:id`} element={<Catalog />} />
        <Route path={`${AppRoute.Catalog}${AppRoute.Product}:id`} element={<ProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      <PageFooter />
    </div>
  );
}

export default App;
