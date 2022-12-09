import {
  useEffect,
  useState
} from 'react';
// import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { updateCamerasInBasketQuantity } from '../../store/basket-data/basket-data';
// import { addToBasket } from '../../store/basket-data/basket-data';
// import { getCamerasInBasket } from '../../store/basket-data/selectors';
import { Camera } from '../../types/camera';
import { formatPrce } from '../../utils/utils';
import ModalDeleteFromBasket from '../modal-delete-from-basket/modal-delete-from-basket';

enum CamerasAmountRange {
  Min = 1,
  Max = 99,
}

type BasketItemProps = {
  camera: Camera;
}

function BasketItem({ camera }: BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    id,
    name,
    vendorCode,
    level,
    type,
    category,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    quantity} = camera;

  // const camerasInBasket = useSelector(getCamerasInBasket);
  // const currentCameraAmount = camerasInBasket
  //   .map((cameraInBasket) => cameraInBasket.id)
  //   .reduce((acc, currentValue) => {
  //     currentValue === camera.id && acc++;
  //     return acc;
  //   }, 0);

  // const [cameraCounter, setCameraCounter] = useState<number>(currentCameraAmount);

  const [cameraCounter, setCameraCounter] = useState<number>(Number(quantity));
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(updateCamerasInBasketQuantity({
      cameraId: id,
      quantity: cameraCounter,
    }));
  }, [cameraCounter, dispatch, id]);

  const handleCameraCounterChange = (value: number) => {
    if (value < CamerasAmountRange.Min) {
      setCameraCounter(CamerasAmountRange.Min);
      return;
    }

    if (value > CamerasAmountRange.Max) {
      setCameraCounter(CamerasAmountRange.Max);
      return;
    }

    setCameraCounter(value);
  };
  const decreaseCameraCounter = () => setCameraCounter(cameraCounter - 1);
  const increaseCameraCounter = () => setCameraCounter(cameraCounter + 1);

  const handleDeleteCameraClick = () => setModalOpen((prevState) => !prevState);

  const handleModalToggle = () => setModalOpen((prevState) => !prevState);

  return (
    <>
      <li key={id} className="basket-item">

        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
            />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x} 2x`}
              width="140" height="120"
              alt={name}
            />
          </picture>
        </div>

        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{`${type} ${category.toLowerCase()}`}</li>
            <li className="basket-item__list-item">{`${level} уровень`}</li>
          </ul>
        </div>

        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>
          {formatPrce(price)} ₽
        </p>

        <div className="quantity">
          <button
            className="btn-icon btn-icon--prev"
            aria-label="уменьшить количество товара"
            disabled={cameraCounter === CamerasAmountRange.Min}
            onClick={decreaseCameraCounter}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>

          <label className="visually-hidden" htmlFor="counter1"></label>
          <input
            type="number"
            id="counter1"
            value={cameraCounter}
            min={CamerasAmountRange.Min}
            max={CamerasAmountRange.Max}
            aria-label="количество товара"
            onChange={(evt) => handleCameraCounterChange(+evt.target.value)}
          />

          <button
            className="btn-icon btn-icon--next"
            aria-label="увеличить количество товара"
            disabled={cameraCounter === CamerasAmountRange.Max}
            onClick={increaseCameraCounter}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>

        <div className="basket-item__total-price">
          <span className="visually-hidden">Общая цена:</span>
          {formatPrce(price * cameraCounter)} ₽
        </div>

        <button
          className="cross-btn"
          type="button"
          aria-label="Удалить товар"
          onClick={handleDeleteCameraClick}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </li>

      { isModalOpen && <ModalDeleteFromBasket camera={camera} handleCloseClick={handleModalToggle} /> }
    </>
  );
}

export default BasketItem;

