import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service/cart.service';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../../services/product-service/product.service';
import { Product } from 'src/app/modals/product';
import { ProductWithQuantityDto } from 'src/app/modals/ProductWithQuantityDto';
import { Delivery } from 'src/app/modals/delivery';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<Product[]> = of([]);
  public buyProducts: Product[] = [];
  shippingFee = 10; 
  subtotal$: Observable<number>;
  gettotal$: any;
  delivery: Delivery = new Delivery('', '', '', '', '', '');
  user: any = {}; 

  public shoppingCartItems: ProductWithQuantityDto[] = [];
  router: any;
  cartId : number;
  constructor(private cartService: CartService, public productService: ProductService,private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.user.id = LocalStorageService.getUser().id;
    this.fetchCartItems();
  }
  
  fetchCartItems() {
    this.cartService.getCartByUserId(this.user.id).subscribe(
      (cart) => {
        if (cart) {
          this.cartId = cart.cartId; 
          console.log("cartId", this.cartId)
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              if (Array.isArray(response) && response.length >= 2) {
                const items = response[1];
                this.shoppingCartItems = items;
                this.buyProducts = items;
              } else {
                console.error('Unexpected response format:', response);
              }
              this.subtotal$ = this.cartService.getTotalAmount(this.cartId);
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
  checkout(userId: number, cartId: number, delivery: any) {
      this.cartService.checkout(this.user.id, this.cartId, delivery).subscribe(
        response => {
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              this.cartService.changeProductsAndQuantities(response); 
            },
            error => {
              console.error('Error fetching cart items:', error);
            }
          );
          this.openSnackBar("Checkout successful", 'success-snackbar');
          console.log('Checkout successful:', response);
        
        },
        error => {
          console.error('Checkout failed:', error);
          this.openSnackBar('Checkout failed', 'error-snackbar');

        }
      );
    }

    openSnackBar(message: string, customClass: string) {
      this.snackBar.open(message, 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['custom-snackbar', customClass] 
      });
    }
}
