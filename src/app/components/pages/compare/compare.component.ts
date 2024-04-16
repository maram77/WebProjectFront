import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { User } from 'src/app/modals/user';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {

  public product            :   Observable<Product[]> = of([]);
  public products           :   Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit() {
    this.product = this.productService.getCompareProducts();
    this.product.subscribe(products => this.products = products);
    console.log(this.product);
  }

     // Add to cart
     public addToCart(user:User, product: Product, quantity: number = 1) {
      this.cartService.addToCart(user.id,product.productReference, quantity);
   }

   // Remove from compare list
   public removeItem(product: Product) {
     this.cartService.removeFromCompare(product.productReference);
   }

}
