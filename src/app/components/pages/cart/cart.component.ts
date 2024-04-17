import { Component, OnInit} from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ProductWithQuantityDto } from 'src/app/modals/ProductWithQuantityDto';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {


  public shoppingCartItems: ProductWithQuantityDto[] = [];
  quantity:number;
  user: any = {}; 
  cartId : number
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.user.id = LocalStorageService.getUser().id;
    this.fetchCartItems();

  }

  fetchCartItems() {
    this.cartService.getCartByUserId(this.user.id).subscribe(
      (cart) => {
        if (cart) {
          this.cartId = cart.cartId; 
          console.log("cartId",this.cartId)
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              if (Array.isArray(response) && response.length >= 2) {
                const items = response[1];
                this.shoppingCartItems = items;
                console.log(items);
              } else {
                console.error('Unexpected response format:', response);
              }
            },
            error => {
              console.error('Error fetching cart items:', error);
            }
          );
        } else {
          console.error('Cart not found for user');
        }
      },
      error => {
        console.error('Error fetching cart:', error);
      }
    );
  }

    public removeItem(item: any) {
      this.cartService.removeProductFromCart(this.cartId, item.product.productReference).subscribe(
        () => {
          console.log('Item removed successfully');
          this.fetchCartItems();
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              this.cartService.changeProductsAndQuantities(response); 
            },
            error => {
              console.error('Error fetching cart items:', error);
            }
            );
        },
        error => {
          console.error('Error removing item:', error);
        }
      );
    }


  public increment(item: ProductWithQuantityDto) {
    item.quantity++; 
    this.cartService.updateProductQuantity(this.cartId, item.product.productReference, item.quantity).subscribe(
      () => {
        console.log('Quantity updated successfully')
        this.cartService.getProductsAndQuantities(this.cartId).subscribe(
          (response: any[]) => {
            this.cartService.changeProductsAndQuantities(response); 
          },
          error => {
            console.error('Error fetching cart items:', error);
          }
        );
    },
      error => console.error('Error updating quantity:', error)
    );
  } 

  public decrement(item: ProductWithQuantityDto) {
    if (item.quantity > 1) { 
      item.quantity--; 
      this.cartService.updateProductQuantity(this.cartId, item.product.productReference, item.quantity).subscribe(
    
        () => {
          console.log('Quantity updated successfully')
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              this.cartService.changeProductsAndQuantities(response); 
            },
            error => {
              console.error('Error fetching cart items:', error);
            }
          );
      },
        error => console.error('Error updating quantity:', error)
      );
  }
}

  public getTotal(): number {
    return 0;
  } 

}
