import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetBasket } from '../../store/basket-data/basket-data';
import { getOrderSendingStatus } from '../../store/basket-data/selectors';
import BasketPromo from '../basket-promo/basket-promo';
import BasketSummaryOrder from '../basket-summary-order/basket-summary-order';
import ModalMakeOrderSuccess from '../modal-make-order-success/modal-make-order-success';

function BasketSummary(): JSX.Element {
  const dispatch = useAppDispatch();

  const orderSendingStatus = useSelector(getOrderSendingStatus);

  const [coupon, setCoupon] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (orderSendingStatus === LoadingStatus.Fulfilled) {
      setModalOpen(true);
      dispatch(resetBasket());
      setCoupon('');
    }
  },[dispatch, orderSendingStatus]);

  const handleModalToggle = () => setModalOpen((prevState) => !prevState);

  return (
    <div data-testid="basket-summary" className="basket__summary">

      <BasketPromo
        coupon={coupon}
        setCoupon={setCoupon}
      />

      <BasketSummaryOrder coupon={coupon} />

      { isModalOpen && <ModalMakeOrderSuccess handleCloseClick={handleModalToggle} /> }
    </div>
  );
}

export default BasketSummary;

