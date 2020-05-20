// createReducer--> Function to define Reducer with parameters
// 1st parameter is the state object schema taht will be updated
// 2nd parametyer on() function. This function listen to the
// action that is dispatched from the Action Subscriber aka
// store subscriber, the second parameter to on() is
// the initial state object taht will be updated by the final state value
// IMP*** --> Do not with any logc in reducer functions

import { createReducer, on } from '@ngrx/store';
import {ProductActions} from './../actions/index';
import {initialProductState} from './../state/app.product.state';
// responsible to monitor dispatched actions from View aka store subscribed by view
// the action invocation is managed using on() method
export const reducer = createReducer(
  initialProductState, // intial state of the store
  on(ProductActions.getProductsSuccess, (state, {products}) => ({
     ...state,  // state.create(products)
     products
  })),
  on(ProductActions.getProductByIdSuccess, (state, {product}) => ({
     ...state,
     selectedProduct : product
  })),
  on(ProductActions.postProductSuccess, (state, {product}) => ({
     ...state,
     product
  })),
  on(ProductActions.putProductSuccess, (state, {product}) => ({
     ...state,
     product
  })),
  on(ProductActions.deleteProductSuccess, (state, {product}) => {
    state.products.forEach((p, index) => {
      if (p.ProductRowId === product.ProductRowId) {
        state.products.splice(index, 1);
      }
    });
    return {
      ...state,
       product
   }}
 )
);
