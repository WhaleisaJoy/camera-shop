import { Middleware } from 'redux';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;
type RedirectAction = ReturnType<typeof redirectToRoute>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: RedirectAction) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
