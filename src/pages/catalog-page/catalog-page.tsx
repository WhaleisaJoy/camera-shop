import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Filter from '../../components/filter/filter';
import PageFooter from '../../components/page-footer/page-footer';
import PageHeader from '../../components/page-header/page-header';
import Pagination from '../../components/pagination/pagination';
import ProductsList from '../../components/products-list/products-list';
import Sort from '../../components/sort/sort';

function Catalog(): JSX.Element {
  return (
    <div className="wrapper">
      <PageHeader />

      <main>
        <Banner />

        <div className="page-content">
          <Breadcrumbs />

          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filter />
                </div>

                <div className="catalog__content">
                  <Sort />
                  <ProductsList />
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

export default Catalog;

