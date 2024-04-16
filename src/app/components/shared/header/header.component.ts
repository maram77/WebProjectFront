import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

 
  products: Product[];
  indexProduct: number;
  public sidenavMenuItems:Array<any>;
  shoppingCartItems: CartItem[] = [];

  constructor(private cartService: CartService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
   }

  ngOnInit() {
 
  }
  isUserLoggedIn(): boolean {
    return LocalStorageService.isUserLoggedIn();
  }

}
