import { Component, OnInit } from '@angular/core';
import { ProductActions } from './../actions/index';
import { Store, select } from '@ngrx/store';
import { IAppProductState } from '../state/app.state';
import { selectProductsList } from '../selectors/app.product.selector';
import {Product} from './../models/app.product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist-component',
  templateUrl: './app.productlist.view.html'
})
export class ProductListComponent implements OnInit {
  columnHeaders: Array<string>;
  product: Product;
  // subscription for the Selector Observable
  products$ =  this._store.pipe(select(selectProductsList));
 // provide the store to the Component using ctor injection
  constructor(private _store: Store<IAppProductState>, private router: Router) {
    this.product = new Product(0,'','','','','',0);
    this.columnHeaders = new Array<string>();
  }

  ngOnInit(): void {
  //  alert('called ');
    // JS Reflection
    for (let c in this.product) {
      this.columnHeaders.push(c);
    }
    // dispatch an action from the store
    this._store.dispatch(ProductActions.getProducts());
  }
  addProductView(): void {
    this.router.navigate(['addProduct']);
  }

  editSelectedProduct(id: number): void {
    this.router.navigate(['editProduct', id]);
  }

  deleteSelectedProduct(product: Product): void {
    this._store.dispatch(ProductActions.deleteProduct({product}));
  }
}
