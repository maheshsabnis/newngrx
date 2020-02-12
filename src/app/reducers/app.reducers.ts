import {ActionReducerMap} from '@ngrx/store';
import { IAppProductState } from '../state/app.state';
import { reducer } from './app.product.reducers';

export const mainReducers: ActionReducerMap<IAppProductState,any> = {
  products: reducer
};
