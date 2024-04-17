import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../../services/cart-service/cart.service';
import { ProductService } from '../../../../services/product-service/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
 @Input() product: Product;
  productImage: any;
  categoryName: string;
  user: any = {}; 
  cartId : number;

  constructor(private cartService: CartService, public productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
    this.loadCategoryName();
    this.user.id = LocalStorageService.getUser().id;

  }

  loadCategoryName() {
    this.productsService.getCategoryByProductReference(this.product.productReference).subscribe(
      (category) => {
        this.categoryName = category.categoryName;
      },
      (error) => {
        console.error('Error loading category name:', error);
      }
    );
  }

  fetchCartItems() {
    this.cartService.getCartByUserId(this.user.id).subscribe(
      (cart) => {
        if (cart) {
          this.cartId = cart.cartId; 
          console.log("cartId",this.cartId)
          this.cartService.getProductsAndQuantities(this.cartId);
        } else {
          console.error('Cart not found for user');
        }
      },
      error => {
        console.error('Error fetching cart:', error);
      }
    );
  }
 

     public addToCart(product: Product,  quantity: number = 1) {
      this.cartService.addToCart(this.cartId,product.productReference,quantity);
      console.log(product, quantity);
    }

    public addToWishlist(product: Product) {
      this.wishlistService.addToWishlist(product);
   }

    public addToCompare(product: Product) {
      this.productsService.addToCompare(product);
   }


  public openProductDialog(product){
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

}
