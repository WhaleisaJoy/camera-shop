import BasketList from '../../components/basket-list/basket-list';
import BasketSummary from '../../components/basket-summary/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { BreadcrumbsSettings } from '../../database';

const BREADCRUMBS_SETTINGS = [
  BreadcrumbsSettings.Root,
  BreadcrumbsSettings.Catalog,
  BreadcrumbsSettings.Basket,
];

function BasketPage(): JSX.Element {
  return (
    <main>
      <div className="page-content">

        <Breadcrumbs settings={BREADCRUMBS_SETTINGS} />

        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>

            <BasketList />

            <BasketSummary />

          </div>
        </section>
      </div>
    </main>
  );
}

export default BasketPage;

