import { Component, OnInit, Input,  OnDestroy } from '@angular/core';
import { Product } from 'src/app/modals/product';
import { CartService } from '../services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';



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
 

  public sidenavMenuItems:Array<any>;

  @Input() shoppingCartItems: Product[] = [];
  

  constructor(private cartService: CartService, public productService: ProductService) {
   
   }

  ngOnInit() {
    console.log(this.cartService.currentProductsAndQuantities);
    this.itemSubscription=this.cartService.currentProductsAndQuantities.subscribe(

      {
        next: (items) => this.shoppingCartItems=items,
        error: (error) => console.log("items subscriber errors", error),
        complete: () => console.log('Observable completed')
        

      },
    )
    console.log(this.itemSubscription);
  
    this.fetchCartItems();
  }
  
  
  fetchCartItems() {
    this.cartService.getProductsAndQuantities(1).subscribe(
      (data: any[]) => {
        // Check if the response is in the expected format
        if (Array.isArray(data) && data.length === 2 && Array.isArray(data[1])) {
          // Extract shopping cart items from the response
          this.shoppingCartItems = data[1];
          console.log(data[1]);
          this.updateSubtotal();
          
        } else {
          console.error('Unexpected response format:', data);
        }
      },
      error => {
        console.error('Error fetching cart items:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }  
  

  

  updateSubtotal() {
    this.subtotal$ = this.cartService.getTotalAmount(1);
   
  }
  

  public updateCurrency(curr) {
    this.productService.currency = curr;
  }

  public removeItem(item: any) {
    this.cartService.removeProductFromCart(1, item.product.productReference).subscribe(
      () => {
        // Successfully removed the item, refresh cart items
        console.log('Item removed successfully');
        this.fetchCartItems();
       
      },
      error => {
        console.error('Error removing item:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }

  public getTotal(): number {
    //this.cartService.getTotalAmount(1);
    return 0;
  }


  ngOnDestroy(){
    this.itemSubscription.unsubscribe();
  }


}
