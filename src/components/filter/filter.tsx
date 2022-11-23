import {
  // useEffect,
  useRef
} from 'react';
// import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FilterKeys, FilterSettings, QueryParams } from '../../const';
// import { useAppDispatch } from '../../hooks';
// import { fetchCamerasPriceRangeAction } from '../../store/api-actions';
// import { getCamerasPriceRange } from '../../store/cameras-data/selectors';
import FilterPriceRange from '../filter-price-range/filter-price-range';

function Filter(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterSettingsChange = (queryParam: string, value: string, isChecked: boolean) => {
    if (isChecked) {
      searchParams.append(queryParam, value);
      setSearchParams(searchParams);
    } else {
      const newSearchParams = [...searchParams.entries()].filter(([_, paramValue]) => paramValue !== value);
      setSearchParams(new URLSearchParams(newSearchParams));
    }
  };

  const handleResetClick = () => {
    FilterKeys.forEach((key) => searchParams.delete(key));
    setSearchParams(searchParams);

    formRef.current && formRef.current.reset();
  };


  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchCamerasPriceRangeAction({
  //     [QueryParams.Category]: searchParams.get(QueryParams.Category),
  //     [QueryParams.Type]: searchParams.get(QueryParams.Type),
  //     [QueryParams.Level]: searchParams.getAll(QueryParams.Level),
  //   }));
  // }, [dispatch, searchParams]);

  // const priceRange = useSelector(getCamerasPriceRange);

  return (
    <div className="catalog-filter">
      <form action="#" ref={formRef}>
        <h2 className="visually-hidden">Фильтр</h2>

        <FilterPriceRange />
        {/* <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder={priceRange.minPrice.toString()} />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder={priceRange.maxPrice.toString()} />
              </label>
            </div>
          </div>
        </fieldset> */}

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="photocamera"
                checked={searchParams
                  .getAll(QueryParams.Category)
                  .includes(FilterSettings.Category.Photocamera)}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Category,
                  FilterSettings.Category.Photocamera,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="videocamera"
                checked={searchParams
                  .getAll(QueryParams.Category)
                  .includes(FilterSettings.Category.Videocamera)}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Category,
                  FilterSettings.Category.Videocamera,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="digital"
                checked={searchParams
                  .getAll(QueryParams.Type)
                  .includes(FilterSettings.Type.Digital)}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Type,
                  FilterSettings.Type.Digital,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="film"
                checked={searchParams
                  .getAll(QueryParams.Type)
                  .includes(FilterSettings.Type.Film)}
                disabled={searchParams.get(QueryParams.Category) === FilterSettings.Category.Videocamera}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Type,
                  FilterSettings.Type.Film,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="snapshot"
                checked={searchParams
                  .getAll(QueryParams.Type)
                  .includes(FilterSettings.Type.Snapshot)}
                disabled={searchParams.get(QueryParams.Category) === FilterSettings.Category.Videocamera}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Type,
                  FilterSettings.Type.Snapshot,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="collection"
                checked={searchParams
                  .getAll(QueryParams.Type)
                  .includes(FilterSettings.Type.Collection)}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Type,
                  FilterSettings.Type.Collection,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="zero"
                checked={searchParams
                  .getAll(QueryParams.Level)
                  .includes(FilterSettings.Level.Zero)}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Level,
                  FilterSettings.Level.Zero,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="non-professional"
                checked={searchParams
                  .getAll(QueryParams.Level)
                  .includes(FilterSettings.Level.NonProfessional)}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Level,
                  FilterSettings.Level.NonProfessional,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="professional"
                checked={searchParams
                  .getAll(QueryParams.Level)
                  .includes(FilterSettings.Level.Professional)}
                onChange={(evt) => handleFilterSettingsChange(
                  QueryParams.Level,
                  FilterSettings.Level.Professional,
                  evt.currentTarget.checked)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>

        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          disabled={[...searchParams.entries()].every(([paramKey]) => !FilterKeys.includes(paramKey))}
          onClick={handleResetClick}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default Filter;
