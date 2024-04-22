import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product';
import { ProductService } from '../../../services/product-service/product.service';
import { CartService } from '../../../services/cart-service/cart.service';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {

  public product            :   Observable<Product[]> = of([]);
  public products           :   Product[] = [];
  user: any = {}; 

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit() {
    this.product = this.productService.getCompareProducts();
    this.product.subscribe(products => this.products = products);
    this.user.id = LocalStorageService.getUser().id;

    console.log(this.product);
  }

     public addToCart(user:any, product: Product, quantity: number = 1) {
      this.cartService.addToCart(this.user.id,product.productReference, quantity);
   }

   public removeItem(product: Product) {
     this.cartService.removeFromCompare(product.productReference);
   }

}