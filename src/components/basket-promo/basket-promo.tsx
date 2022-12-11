import { ChangeEvent, Dispatch, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postCouponAction } from '../../store/api-actions';
import { getCouponSendingStatus } from '../../store/basket-data/selectors';

type BasketPromoProps = {
  coupon: string;
  setCoupon: Dispatch<React.SetStateAction<string>>;
}

function BasketPromo({ coupon, setCoupon }: BasketPromoProps): JSX.Element {
  const dispatch = useAppDispatch();

  const couponSendingStatus = useSelector(getCouponSendingStatus);

  const handleCouponInputChange = (evt: ChangeEvent<HTMLInputElement>) => setCoupon(evt.target.value.trim());

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    coupon && dispatch(postCouponAction({coupon}));
  };

  const isCouponSendingStatusIsPending = couponSendingStatus === LoadingStatus.Pending;

  return (
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
  );
}

export default BasketPromo;

