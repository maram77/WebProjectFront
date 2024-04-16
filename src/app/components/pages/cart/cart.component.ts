import { Component, OnInit} from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ProductWithQuantityDto } from 'src/app/modals/ProductWithQuantityDto';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {


  public shoppingCartItems: ProductWithQuantityDto[] = [];
  quantity:number;
 

 


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.cartService.getProductsAndQuantities(1).subscribe(
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
  }

    public removeItem(item: any) {
      this.cartService.removeProductFromCart(1, item.product.productReference).subscribe(
        () => {
          // Successfully removed the item, refresh cart items
          console.log('Item removed successfully');
          this.fetchCartItems();
          this.cartService.getProductsAndQuantities(1).subscribe(
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
    item.quantity++; // Increment the quantity locally
    this.cartService.updateProductQuantity(1, item.product.productReference, item.quantity).subscribe(
    
      () => {
        console.log('Quantity updated successfully')
        this.cartService.getProductsAndQuantities(1).subscribe(
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
    if (item.quantity > 1) { // Ensure quantity doesn't go below 1
      item.quantity--; // Decrement the quantity locally
      this.cartService.updateProductQuantity(1, item.product.productReference, item.quantity).subscribe(
    
        () => {
          console.log('Quantity updated successfully')
          this.cartService.getProductsAndQuantities(1).subscribe(
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
