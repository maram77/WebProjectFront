import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

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
  constructor(private cartService: CartService, public productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
    this.loadCategoryName();

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

 

     // Add to cart
     public addToCart(product: Product,  quantity: number = 1) {
      this.cartService.addToCart(1,product.productReference,quantity);
      console.log(product, quantity);
    }

    // Add to wishlist
    public addToWishlist(product: Product) {
      this.wishlistService.addToWishlist(product);
   }

    // Add to compare
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
