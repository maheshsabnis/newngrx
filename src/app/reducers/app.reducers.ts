import {ActionReducerMap} from '@ngrx/store';
import { IAppProductState } from '../state/app.state';
import { reducer } from './app.product.reducers';

// facade for reducers to that the Reducer knows what state from store
// will be monitored
export const mainReducers: ActionReducerMap<IAppProductState,any> = {
  products: reducer
};
