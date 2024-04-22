import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../../services/cart-service/cart.service';
import { ProductService } from '../../../../services/product-service/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public counter: number = 1;

  constructor(private cartService: CartService, 
    public productsService: ProductService,
    private wishlistService: WishlistService, 
    private dialog: MatDialog, 
    private router: Router,
    private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.loadCategoryName();
    this.user.id = LocalStorageService.getUser().id;
    this.fetchCartItems();

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

   
    /*public addToCart(product: Product, quantity: number = 1) {
      if (!LocalStorageService.isUserLoggedIn()) { 
        this.router.navigate(['/pages/my-account']);  
      } else {
        this.cartService.addToCart(this.cartId, product.productReference, quantity);
        console.log(product, quantity);
      }
    }*/
    fetchCartItems() {
      this.cartService.getCartByUserId(this.user.id).subscribe(
        (cart) => {
          if (cart) {
            this.cartId = cart.cartId;
            this.cartService.getProductsAndQuantities(this.cartId).subscribe(
              (response: any) => {
                if (response) {
                  const items = response;
                  console.log(items);
                } else {
                  console.error("Unexpected response format:", response);
                }
              },
              (error) => {
                console.error("Error fetching cart items:", error);
              }
            );
          } else {
            console.error("Cart not found for user");
          }
        },
        (error) => {
          console.error("Error fetching cart:", error);
        }
      );
    }
    public addToCart(user,productReference: string, counter) {
      if (!LocalStorageService.isUserLoggedIn()) { 
        this.router.navigate(['/pages/my-account']);  
        this.openSnackBar("Please sign up or log in to add items to the cart!", 'info-snackbar'); 

      }else {
      if (counter == 0) return false;
      this.cartService.addToCart(this.user.id, this.product.productReference, parseInt(counter)).subscribe(
        () => {  
          console.log('Quantity updated successfully')
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              this.cartService.changeProductsAndQuantities(response);
              this.openSnackBar("Product added to cart successfully!", 'success-snackbar'); 
            },
            error => {
              console.error('Error fetching cart items:', error);
              this.openSnackBar("Something is wrong!", 'error-snackbar'); 
            }
          );
      },
        error => console.error('Error updating quantity:', error)
    
      );
    }
    }
    openSnackBar(message: string, customClass: string) {
      this.snackBar.open(message, 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['custom-snackbar', customClass] 
      });
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