import { Injectable } from '@angular/core';
// of --> the method, monitor the execution of
// the Observale thorugh effect
import { of } from 'rxjs';
// Store --> reference of the store that will be impacted
// select --> Used to execute a 'selector' (?) on store using effect
import { Store, select } from '@ngrx/store';
// importing all required objects for defining and executing effects
// Actions --> the actions those are input and output for
// effects
// ofType --> Current action name for which the effect will be executed
// createEffect --> creating the effect definition
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
// IAppProductState --> Initial State Schema for the store
// that will be affected by the Effects after execution
import { IAppProductState } from '../state/app.state';
// importing all actions
import { ProductActions} from './../actions/index';
// importing HTTPService that contains all Async Calls
import { HttpService } from '../services/app.product.service';
// the selector that will be used by effect to read data from store
import { selectProductsList } from '../selectors/app.product.selector';
// switchMap --> Reda data from Observable and Process it
// map --> Map the NGRX action to the payload
// and help switchMap to read data for processing
// withLatestFrom --> Used to select specific amount / type of data
// from observale like 'select' query
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Product } from '../models/app.product.model';

@Injectable()
export class ProductsEffects {
  // if any declaration is of the type promise /observale for async
  // operations are used then postfix-it using $ sign
  // _action$.pipe() method that will be executed
  // for the action being dispatched
  getProduct$ = createEffect(() =>  this._action$.pipe(
    ofType(ProductActions.getProductById),
    map(action => action.payload),
    // execute the selectProductsList selector using 'select' method
    // on the store
    withLatestFrom(this._store.pipe(select(selectProductsList))), // using the seelctor
    switchMap(([id, products]) => {
      const selectedProduct = products.filter(product => product.ProductRowId === +id)[0];
      console.log(`in effect ${id} ${JSON.stringify(selectedProduct)}`);
      return of(ProductActions.getProductByIdSuccess({product : selectedProduct}));
    })
  ));
  getProducts$ = createEffect(() => this._action$.pipe(
    ofType(ProductActions.getProducts), // if store dispatch the getProducts action then
    switchMap(() => this._serv.getData()), // subscribe to the getData() method of NG Service
    // subscribe to the observable, process it and return the succes action
    switchMap((products: Product[]) => of(ProductActions.getProductsSuccess({products})))
  ));


  postProduct$ = createEffect(() => this._action$.pipe(
    ofType(ProductActions.postProduct),
    switchMap((param) => this._serv.postData(param.product)),
    // subscribe to the observable, process it and return the succes action
    switchMap((product: Product) => of(ProductActions.postProductSuccess({product})))
    ));


  putProduct$ = createEffect(() => this._action$.pipe(
    ofType(ProductActions.putProduct),
    switchMap((param) => this._serv.putData(param.product)),
    switchMap((product: Product) => of(ProductActions.putProductSuccess({product})))
  ));

  deleteProduct$ = createEffect(() => this._action$.pipe(
    ofType(ProductActions.deleteProduct),
    switchMap((param) => this._serv.deleteData(param.product.ProductRowId)),
    // on true return from the service
    // execute the selector on store get the product that is deleted using
    // selector from from store and pass it as payload to the
    // success method
    switchMap((product: Product) => of(ProductActions.deleteProductSuccess({product})))
  ));

  constructor(
    // tslint:disable-next-line: variable-name
    private _serv: HttpService,
    // tslint:disable-next-line: variable-name
    private _action$: Actions,
    // tslint:disable-next-line: variable-name
    private _store: Store<IAppProductState>
  ){}
}
