import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';
import { Product } from 'src/app/modals/product';
import { ProductWithQuantityDto } from 'src/app/modals/ProductWithQuantityDto';
import { Delivery } from 'src/app/modals/delivery';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<Product[]> = of([]);
  public buyProducts: Product[] = [];
  shippingFee = 10; // Define the shipping fee
  subtotal$: Observable<number>;
  gettotal$: any;
  delivery: Delivery = new Delivery('', '', '', '', '', '');

  public shoppingCartItems: ProductWithQuantityDto[] = [];
  router: any;

  constructor(private cartService: CartService, public productService: ProductService) { }

  ngOnInit() {
    this.fetchCartItems();
    this.subtotal$ = this.cartService.getTotalAmount(1);
  }

    fetchCartItems() {
      this.cartService.getProductsAndQuantities(1).subscribe(
        (response: any[]) => {
          // Check if the response is an array and has at least two elements
          if (Array.isArray(response) && response.length >= 2) {
            // Extract the array of items from the response
            const items = response[1];
            // Update the shoppingCartItems property with the extracted items
            this.shoppingCartItems = items;
            this.buyProducts=items;
            console.log(items);
          } else {
            console.error('Unexpected response format:', response);
          }
        },
        error => {
          console.error('Error fetching cart items:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
    }

    checkout(userId: number, cartId: number, delivery: any) {
      console.log("I'm in checkout");
      console.log(delivery);
      this.cartService.checkout(1, 1, delivery).subscribe(
        response => {
          // Handle successful checkout
          this.cartService.getProductsAndQuantities(1).subscribe(
            (response: any[]) => {
              this.cartService.changeProductsAndQuantities(response); 
            },
            error => {
              console.error('Error fetching cart items:', error);
            }
          );
          console.log('Checkout successful:', response);
        
        },
        error => {
          // Handle error during checkout
          console.error('Checkout failed:', error);
        }
      );
    }
  

}
