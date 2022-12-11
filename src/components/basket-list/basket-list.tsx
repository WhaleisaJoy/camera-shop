import { useSelector } from 'react-redux';
import { getCamerasInBasket } from '../../store/basket-data/selectors';
import BasketItem from '../basket-item/basket-item';
import './basket-list.css';

function BasketList(): JSX.Element {
  const camerasInBasket = useSelector(getCamerasInBasket);

  return (
    <>
      {
        camerasInBasket.length > 0 &&
          <ul className="basket__list" data-testid="basket-list">
            { camerasInBasket.map((camera) => <BasketItem key={camera.id} camera={camera} />) }
          </ul >
      }

      { camerasInBasket.length === 0 && <p className='basket-empty-title'>В корзине пока пусто</p> }
    </>
  );
}

export default BasketList;

