import { IProductState, initialProductState } from './app.product.state';

// the initial state in store that will be used to
// read (all records )/write (create/update/delete)/select (read single)
export interface IAppProductState {
  products: IProductState;
}
