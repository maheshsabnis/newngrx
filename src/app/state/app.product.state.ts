import { Product } from '../models/app.product.model';

// the ProductState interface type and the initial Product state

export interface IProductState {
   products: Product[]; // all read operations
   product: Product; // write opetions (create new / update)
   selectedProduct: Product; // query to store
};

// the intial state of data in store
export const initialProductState: IProductState = {
  products: null,
  product: null,
  selectedProduct: null
};
