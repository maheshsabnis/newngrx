import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { IAppProductState } from '../state/app.state';
import { ProductActions} from './../actions/index';
import { HttpService } from '../services/app.product.service';
import { selectProductsList } from '../selectors/app.product.selector';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Product } from '../models/app.product.model';

@Injectable()
export class ProductsEffects {
  getProduct$ = createEffect(() =>  this._action$.pipe(
    ofType(ProductActions.getProductById),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectProductsList))),
    switchMap(([id, products]) => {
      const selectedProduct = products.filter(product => product.ProductRowId === +id)[0];
      console.log(`in effect ${id} ${JSON.stringify(selectedProduct)}`);
      return of(ProductActions.getProductByIdSuccess({product : selectedProduct}));
    })
  ));
  getProducts$ = createEffect(() => this._action$.pipe(
    ofType(ProductActions.getProducts),
    switchMap(() => this._serv.getData()),
    switchMap((products: Product[]) => of(ProductActions.getProductsSuccess({products})))
  ));


  postProduct$ = createEffect(() => this._action$.pipe(
    ofType(ProductActions.postProduct),
    switchMap((param) => this._serv.postData(param.product)),
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
