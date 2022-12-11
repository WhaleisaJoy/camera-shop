import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_COUPON_DISCOUNT, LoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postOrderAction } from '../../store/api-actions';
import { setCouponDiscount } from '../../store/basket-data/basket-data';
import { getCamerasInBasket, getCamerasInBasketTotalPrice, getCouponDiscount, getCouponSendingStatus } from '../../store/basket-data/selectors';
import { convertToPercent, formatPrce } from '../../utils/utils';

type BasketSummaryOrderProps = {
  coupon: string;
}

function BasketSummaryOrder({ coupon }: BasketSummaryOrderProps): JSX.Element {
  const dispatch = useAppDispatch();

  const camerasInBasket = useSelector(getCamerasInBasket);
  const totalPrice = useSelector(getCamerasInBasketTotalPrice);
  const couponSendingStatus = useSelector(getCouponSendingStatus);
  const couponDiscount = useSelector(getCouponDiscount);
  const couponDiscountPercent = convertToPercent(couponDiscount);

  const [isCouponValid, setCouponValidity] = useState<boolean>(false);

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

  }, [couponSendingStatus, dispatch]);

  const handleMakeOrder = () => {
    const camerasIds: number[] = [];
    camerasInBasket.forEach(({ id, quantity }) => {
      for (let i = 0; i < Number(quantity); i++) {
        camerasIds.push(id);
      }
    });

    dispatch(postOrderAction({
      camerasIds,
      coupon: isCouponValid ? coupon : null,
    }));
  };

  const isCouponSendingStatusIsPending = couponSendingStatus === LoadingStatus.Pending;

  return (
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
  );
}

export default BasketSummaryOrder;

