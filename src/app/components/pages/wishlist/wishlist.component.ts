import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { CartService } from '../../shared/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit {

  public product        :   Observable<Product[]> = of([]);
  wishlistItems  :   Product[] = [];

  constructor(private cartService: CartService, private wishlistService: WishlistService) {
    this.product = this.wishlistService.getProducts();
    this.product.subscribe(products => this.wishlistItems = products);
  }

  ngOnInit() {
  }

 public addToCart(product: Product,  quantity: number = 1) {
  if (quantity > 0)
   this.cartService.addToCart(product,quantity);
   this.wishlistService.removeFromWishlist(product);
}

public removeItem(product: Product) {
 this.wishlistService.removeFromWishlist(product);
}

}
