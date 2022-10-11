import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../../pages/catalog-page/catalog-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Catalog} element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
