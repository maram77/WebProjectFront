import { Product } from './product.model';
import { User } from './user';

export interface Cart {
  cartId: number;
  user: User;
  productQuantityMap: Map<Product, number>;
}