import { useSearchParams } from 'react-router-dom';
import { QueryParams, SortSettings } from '../../const';

function Sort(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortSettingsChange = (sortSettings: string, value: string) => {
    !searchParams.has(QueryParams.Sort) && searchParams.set(QueryParams.Sort, SortSettings.Type.Price);
    !searchParams.has(QueryParams.Order) && searchParams.set(QueryParams.Order, SortSettings.Order.Asc);
    searchParams.set(sortSettings, value);
    setSearchParams(searchParams);
  };

  const isPriceCheched = searchParams.get(QueryParams.Sort) === SortSettings.Type.Price;
  const isRatingCheched = searchParams.get(QueryParams.Sort) === SortSettings.Type.Rating;
  const isUpCheched = searchParams.get(QueryParams.Order) === SortSettings.Order.Asc;
  const isDownCheched = searchParams.get(QueryParams.Order) === SortSettings.Order.Desc;

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>

          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                data-testid="sort-price"
                type="radio"
                id="sortPrice"
                name="sort"
                checked={isPriceCheched}
                onChange={() => handleSortSettingsChange(QueryParams.Sort, SortSettings.Type.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                data-testid="sort-popular"
                type="radio"
                id="sortPopular"
                name="sort"
                checked={isRatingCheched}
                onChange={() => handleSortSettingsChange(QueryParams.Sort, SortSettings.Type.Rating)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>

          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                data-testid="order-asc"
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={isUpCheched}
                onChange={() => handleSortSettingsChange(QueryParams.Order, SortSettings.Order.Asc)}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                data-testid="order-desc"
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={isDownCheched}
                onChange={() => handleSortSettingsChange(QueryParams.Order, SortSettings.Order.Desc)}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default Sort;
