import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { KeyCode, QueryParams } from '../../const';
import { getCameras, getCamerasPriceRange } from '../../store/cameras-data/selectors';

function FilterPriceRange(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const priceRange = useSelector(getCamerasPriceRange);

  const cameras = useSelector(getCameras);

  const [priceFrom, setPriceFrom] = useState<string>('');
  const [priceTo, setPriceTo] = useState<string>('');

  useEffect(() => {
    const priceFromParam = searchParams.get(QueryParams.PriceFrom) ? Number(searchParams.get(QueryParams.PriceFrom)) : '';
    const priceToParam = searchParams.get(QueryParams.PriceTo) ? Number(searchParams.get(QueryParams.PriceTo)) : '';
    setPriceFrom(priceFromParam.toString());
    setPriceTo(priceToParam.toString());
  }, [searchParams]);

  const handlePriceChange = (value: string, setPrice: (value: React.SetStateAction<string>) => void) => {
    if (Number(value) < 0) {
      setPrice('');
      return;
    }

    setPrice(value);
  };

  const handlePriceKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>, handlePriceBlur: (value: string) => void) => {
    evt.key === KeyCode.Enter && handlePriceBlur(evt.currentTarget.value);
  };

  const handlePriceFromBlur = (value: string) => {
    if (value !== '') {
      if (Number(value) < priceRange.minPrice) {
        setPriceFrom(priceRange.minPrice.toString());
        searchParams.set(QueryParams.PriceFrom, priceRange.minPrice.toString());
        setSearchParams(searchParams);
        return;
      }

      if (Number(value) > Number(priceTo) && priceTo !== '') {
        setPriceFrom(priceTo);
        searchParams.set(QueryParams.PriceFrom, priceTo);
        setSearchParams(searchParams);
        return;
      }

      if (cameras.some((camera) => camera.price === Number(value))) {
        searchParams.set(QueryParams.PriceFrom, value);
      } else {
        const camerasWithHigherPrice = [...cameras]
          .filter((camera) => camera.price > Number(value))
          .sort((a, b) => a.price - b.price);
        const closestMinPrice = camerasWithHigherPrice[0].price;

        setPriceFrom(closestMinPrice.toString());
        searchParams.set(QueryParams.PriceFrom, closestMinPrice.toString());
      }
    } else {
      searchParams.get(QueryParams.PriceFrom) && searchParams.delete(QueryParams.PriceFrom);
    }

    setSearchParams(searchParams);
  };

  const handlePriceToBlur = (value: string) => {
    if (value !== '') {
      if (Number(value) > priceRange.maxPrice || Number(value) < priceRange.minPrice) {
        setPriceTo(priceRange.maxPrice.toString());
        searchParams.set(QueryParams.PriceTo, priceRange.maxPrice.toString());
        setSearchParams(searchParams);
        return;
      }

      if (Number(value) < Number(priceFrom) && priceFrom !== '') {
        setPriceTo(priceFrom);
        searchParams.set(QueryParams.PriceTo, priceFrom);
        setSearchParams(searchParams);
        return;
      }

      if (cameras.some((camera) => camera.price === Number(value))) {
        searchParams.set(QueryParams.PriceTo, value);
      } else {
        const camerasWithLowerPrice = [...cameras]
          .filter((camera) => camera.price < Number(value))
          .sort((a, b) => b.price - a.price);
        const closestMinPrice = camerasWithLowerPrice[0].price;

        setPriceTo(closestMinPrice.toString());
        searchParams.set(QueryParams.PriceTo, closestMinPrice.toString());
      }
    } else {
      searchParams.get(QueryParams.PriceTo) && searchParams.delete(QueryParams.PriceTo);
    }

    setSearchParams(searchParams);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              value={priceFrom}
              min={0}
              placeholder={priceRange.minPrice.toString()}
              onChange={(evt) => handlePriceChange(evt.currentTarget.value, setPriceFrom)}
              onBlur={(evt) => handlePriceFromBlur(evt.currentTarget.value)}
              onKeyDown={(evt) => handlePriceKeyDown(evt, handlePriceFromBlur)}
            />
          </label>
        </div>

        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              value={priceTo}
              min={0}
              placeholder={priceRange.maxPrice.toString()}
              onChange={(evt) => handlePriceChange(evt.currentTarget.value, setPriceTo)}
              onBlur={(evt) => handlePriceToBlur(evt.currentTarget.value)}
              onKeyDown={(evt) => handlePriceKeyDown(evt, handlePriceToBlur)}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPriceRange;
