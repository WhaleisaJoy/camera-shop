import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_COUPON_DISCOUNT, LoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postCouponAction, postOrderAction } from '../../store/api-actions';
import { resetBasket, setCouponDiscount } from '../../store/basket-data/basket-data';
import { getCamerasInBasket, getCamerasInBasketTotalPrice, getCouponDiscount, getCouponSendingStatus, getOrderSendingStatus } from '../../store/basket-data/selectors';
import { convertToPercent, formatPrce } from '../../utils/utils';
import ModalMakeOrderSuccess from '../modal-make-order-success/modal-make-order-success';

function BasketSummary(): JSX.Element {
  const dispatch = useAppDispatch();

  const camerasInBasket = useSelector(getCamerasInBasket);
  const totalPrice = useSelector(getCamerasInBasketTotalPrice);
  const couponSendingStatus = useSelector(getCouponSendingStatus);
  const orderSendingStatus = useSelector(getOrderSendingStatus);
  const couponDiscount = useSelector(getCouponDiscount);
  const couponDiscountPercent = convertToPercent(couponDiscount);

  const [coupon, setCoupon] = useState<string>('');
  const [isCouponValid, setCouponValidity] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    switch (couponSendingStatus) {
      case LoadingStatus.Fulfilled:
        setCouponValidity(true);
        break;
      case LoadingStatus.Rejected:
        setCouponValidity(false);
        dispatch(setCouponDiscount(DEFAULT_COUPON_DISCOUNT));
        break;
      default:
        break;
    }

    // couponSendingStatus === LoadingStatus.Fulfilled
    //   ? setCouponValidity(true)
    //   : setCouponValidity(false);
  }, [couponSendingStatus, dispatch]);

  useEffect(() => {
    if (orderSendingStatus === LoadingStatus.Fulfilled) {
      setModalOpen(true);
      dispatch(resetBasket());
      setCoupon('');
    }
  },[dispatch, orderSendingStatus]);

  const handleCouponInputChange = (evt: ChangeEvent<HTMLInputElement>) => setCoupon(evt.target.value.trim());

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    coupon && dispatch(postCouponAction({coupon}));
  };

  const handleMakeOrder = () => {
    // const camerasInBasketIds = useSelector(getCamerasInBasketIds);
    const camerasIds: number[] = [];
    camerasInBasket.forEach(({ id, quantity }) => {
      for (let i = 0; i < Number(quantity); i++) {
        camerasIds.push(id);
      }
    });
    // const camerasInBasketIds2: number[] = camerasInBasket
    //   .map<number[]>(({ id, quantity }) => Array.from({length: Number(quantity)}).fill(id))
    //   .flat();

    dispatch(postOrderAction({
      camerasIds,
      coupon: isCouponValid ? coupon : null,
    }));
  };

  const handleModalToggle = () => setModalOpen((prevState) => !prevState);

  const isCouponSendingStatusIsPending = couponSendingStatus === LoadingStatus.Pending;

  return (
    <div className="basket__summary">
      <div className="basket__promo">

        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>

        <div className="basket-form">
          <form
            method='post'
            onSubmit={handleFormSubmit}
          >
            <div className={`custom-input
              ${couponSendingStatus === LoadingStatus.Fulfilled ? 'is-valid' : ''}
              ${couponSendingStatus === LoadingStatus.Rejected ? 'is-invalid' : ''}`}
            >
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  value={coupon}
                  placeholder="Введите промокод"
                  onChange={handleCouponInputChange}
                  disabled={isCouponSendingStatusIsPending}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={isCouponSendingStatusIsPending}
            >
              Применить
            </button>
          </form>
        </div>

      </div>

      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">
            {formatPrce(totalPrice)} ₽
          </span>
        </p>

        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={`basket__summary-value
            ${couponDiscount !== 0 ? 'basket__summary-value--bonus' : ''}`}
          >
            { couponDiscount === 0 ? '0' : formatPrce(totalPrice * couponDiscountPercent) } ₽
          </span>
        </p>

        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">
            { formatPrce(totalPrice - totalPrice * couponDiscountPercent) } ₽
          </span>
        </p>

        <button
          className="btn btn--purple"
          type="submit"
          onClick={handleMakeOrder}
          disabled={isCouponSendingStatusIsPending}
        >
          Оформить заказ
        </button>
      </div>

      { isModalOpen && <ModalMakeOrderSuccess handleCloseClick={handleModalToggle} /> }
    </div>
  );
}

export default BasketSummary;

