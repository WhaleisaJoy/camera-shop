import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../const';
import Catalog from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import PageFooter from '../page-footer/page-footer';
import PageHeader from '../page-header/page-header';

const GO_TO_DEFAULT_PAGE = <Navigate to={`${AppRoute.CatalogPage}${DEFAULT_PAGE}`} />;

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <PageHeader />

        <Routes>
          <Route path={AppRoute.Root} element={GO_TO_DEFAULT_PAGE} />
          <Route path={AppRoute.Catalog} element={GO_TO_DEFAULT_PAGE} />
          <Route path={`${AppRoute.CatalogPage}:id`} element={<Catalog />} />
          <Route path={`${AppRoute.Catalog}${AppRoute.Product}:id`} element={<ProductPage />} />
        </Routes>

        <PageFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
