import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postCouponAction } from '../../store/api-actions';
import { getCamerasInBasketTotalPrice, getCouponDiscount, getCouponSendingStatus } from '../../store/basket-data/selectors';
import { convertToPercent, formatPrce } from '../../utils/utils';

function BasketSummary(): JSX.Element {
  const dispatch = useAppDispatch();

  const totalPrice = useSelector(getCamerasInBasketTotalPrice);
  const couponSendingStatus = useSelector(getCouponSendingStatus);
  const couponDiscount = useSelector(getCouponDiscount);
  const couponDiscountPercent = convertToPercent(couponDiscount);

  const [coupon, setCoupon] = useState<string>('');

  const handleCouponInputChange = (evt: ChangeEvent<HTMLInputElement>) => setCoupon(evt.target.value.trim());

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    coupon && dispatch(postCouponAction({coupon}));
  };

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
                  disabled={couponSendingStatus === LoadingStatus.Pending}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={couponSendingStatus === LoadingStatus.Pending}
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

        <button className="btn btn--purple" type="submit">Оформить заказ</button>
      </div>
    </div>
  );
}

export default BasketSummary;

