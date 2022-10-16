import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE } from '../../const';
import Catalog from '../../pages/catalog-page/catalog-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Navigate to={`${AppRoute.Catalog}${DEFAULT_PAGE}`} />} />
        <Route path={`${AppRoute.Catalog}:id`} element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
