import { Component, OnInit, Input,  OnDestroy } from '@angular/core';
import { Product } from 'src/app/modals/product';
import { CartService } from '../../../services/cart-service/cart.service';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../services/product-service/product.service';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-shopping-widgets',
  templateUrl: './shopping-widgets.component.html',
  styleUrls: ['./shopping-widgets.component.sass']
})
export class ShoppingWidgetsComponent implements OnInit, OnDestroy {
  itemSubscription: Subscription;

  subtotal$: Observable<number>;
  products: Product[];
  indexProduct: number;
  cartItems:any;
  cartId : number;
  user: any = {}; 

  public sidenavMenuItems:Array<any>;

  @Input() shoppingCartItems: Product[] = [];
  

  constructor(private cartService: CartService,private snackBar: MatSnackBar, public productService: ProductService) {
   
   }

  ngOnInit() {
   
    this.itemSubscription=this.cartService.currentProductsAndQuantities.subscribe(

      {
        next: (items) => this.shoppingCartItems=items,
        error: (error) => console.log("items subscriber errors", error),
        complete: () => console.log('Observable completed')
        

      }
    )
    //console.log(this.itemSubscription);
  
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
              if (Array.isArray(response)) {
                this.shoppingCartItems = response;
                this.updateSubtotal();
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
  

  updateSubtotal() {
    this.subtotal$ = this.cartService.getTotalAmount(this.cartId);
  }
  
  public updateCurrency(curr) {
    this.productService.currency = curr;
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

  public getTotal(): number {
    return 0;
  }

  ngOnDestroy(){
    this.itemSubscription.unsubscribe();
  }

  openSnackBar(message: string, customClass: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      verticalPosition: 'top', 
      panelClass: ['custom-snackbar', customClass] 
    });
  }


}
