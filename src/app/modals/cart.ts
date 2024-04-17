import { Product } from './product.model';

export interface Cart {
  cartId: number;
  //user: User;
  productQuantityMap: Map<Product, number>;
}