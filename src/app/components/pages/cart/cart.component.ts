import { Component, OnInit} from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { ProductWithQuantityDto } from 'src/app/modals/ProductWithQuantityDto';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { MatSnackBar } from '@angular/material';

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
  constructor(private cartService: CartService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user.id = LocalStorageService.getUser().id;
    this.fetchCartItems();

  }


  fetchCartItems() {
    this.cartService.getCartByUserId(this.user.id).subscribe(
      (cart) => {
        if (cart) {
          this.cartId = cart.cartId; 
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              this.shoppingCartItems = response;
              console.log(this.shoppingCartItems);
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
              this.openSnackBar("Product removed succefully!", 'success-snackbar'); 
            },
            error => {
              console.error('Error fetching cart items:', error);
              this.openSnackBar("Something is wrong!", 'error-snackbar'); 
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

  openSnackBar(message: string, customClass: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      verticalPosition: 'top', 
      panelClass: ['custom-snackbar', customClass] 
    });
  }


}
