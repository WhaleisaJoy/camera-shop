import { DebounceInput } from 'react-debounce-input';
import ClickAwayListener from 'react-click-away-listener';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoute, KeyCode } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchCamerasBySearchAction } from '../../store/api-actions';
import { getCamerasBySearch } from '../../store/search-data/selectors';

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSearchListOpen, setSearchListOpen] = useState<boolean>(false);
  const [inputField, setInputField] = useState<string>('');

  const camerasBySearch = useSelector(getCamerasBySearch);

  camerasBySearch.length > 0 && !isSearchListOpen && inputField && setSearchListOpen(true);

  const handleInputChange = (value: string) => {
    setInputField(value);
    value && dispatch(fetchCamerasBySearchAction(value));
  };

  const handleListItemClick = (id: number) => {
    navigate(`${AppRoute.Catalog}${AppRoute.Product}${id.toString()}`);
    resetSearch();
  };

  const handleListItemKeyDown = (evt: React.KeyboardEvent<HTMLLIElement>, id: number) => {
    evt.key === KeyCode.Enter && handleListItemClick(id);
  };

  const resetSearch = () => {
    setInputField('');
    setSearchListOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={resetSearch}>
      <div
        className={`form-search ${isSearchListOpen ? 'list-opened' : ''}`}
        data-testid="form-search"
      >
        <form>
          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <DebounceInput
              data-testid="search-input"
              className="form-search__input"
              type="text"
              value={inputField}
              autoComplete="off"
              placeholder="Поиск по сайту"
              debounceTimeout={500}
              onChange={(evt) => handleInputChange(evt.target.value)}
            />
          </label>
          <ul className="form-search__select-list scroller">
            {
              camerasBySearch.length > 0 && camerasBySearch.map((camera) => (
                <li
                  key={camera.id}
                  className="form-search__select-item"
                  tabIndex={0}
                  onClick={() => handleListItemClick(camera.id)}
                  onKeyDown={(evt) => handleListItemKeyDown(evt, camera.id)}
                >
                  {camera.name}
                </li>
              ))
            }
          </ul>
        </form>

        <button
          className="form-search__reset"
          type="reset"
          onClick={resetSearch}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
          <span className="visually-hidden">
            Сбросить поиск
          </span>
        </button>
      </div>
    </ClickAwayListener>
  );
}

export default FormSearch;
