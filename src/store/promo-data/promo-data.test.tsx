import { promoData } from './promo-data';
import { makeFakePromo } from '../../utils/mock';
import { DefaultPromo } from '../../database';
import { fetchPromoAction } from '../api-actions';

const fakePromo = makeFakePromo();
const initialStoreState = {
  promo: DefaultPromo,
  isPromoLoaded: false,
};

describe('Reducer: promoData', () => {
  const state = initialStoreState;

  it('without additional parameters should return initial state', () => {
    expect(promoData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialStoreState);
  });

  describe('Action: fetchPromoAction', () => {
    it('should update isPromoLoaded to true when fetchPromoAction pending', () => {
      expect(promoData.reducer(state, { type: fetchPromoAction.pending.type }))
        .toEqual({ ...initialStoreState, isPromoLoaded: true });
    });

    it('should update promo by fetchPromoAction', () => {
      expect(promoData.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: fakePromo }))
        .toEqual({ ...initialStoreState, promo: fakePromo });
    });
  });
});
