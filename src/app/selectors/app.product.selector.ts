// createSelector --> a method that will be used to define
// selectors, this selector will need the definition of the state
// schema that will be used to execute the selector
import { createSelector } from '@ngrx/store';
import { IAppProductState } from '../state/app.state';
import { IProductState } from '../state/app.product.state';

// state subscription for defining the scehma of state used by store
const selectProducts = (state: IAppProductState) => state.products;
// creating selector for all data of products from Store
export const selectProductsList = createSelector(
  selectProducts,
  (state: IProductState) => state.products
);
// creating selector for selected product from Store
export const selectProduct = createSelector(
  selectProducts,
  (state: IProductState) => state.selectedProduct // write query type logic (state, id)=> state.products[i].ProdutcId ==id
);
