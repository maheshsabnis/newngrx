import { Product } from '../models/app.product.model';

// the ProductState interface type and the initial Product state

export interface IProductState {
   products: Product[];
   product: Product,
   selectedProduct: Product;
};

export const initialProductState: IProductState = {
  products: null,
  product: null,
  selectedProduct: null
};
