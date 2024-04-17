import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/modals/product';
import { CartService } from '../../../../services/cart-service/cart.service';
import { ProductService } from '../../../../services/product-service/product.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass']
})
export class ProductDialogComponent implements OnInit {

  public products           :   Product[] = [];
  public counter            :   number = 1;
  public variantImage       :   any = '';
  public selectedColor      :   any = '';
  public selectedSize       :   any = '';
  public brandName          :   string;
  user: any = {}; 
  cartId : number;
  constructor(private router: Router, public productsService: ProductService, private cartService: CartService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    this.user.id = LocalStorageService.getUser().id;
    this.productsService.getProducts().subscribe(product => this.products = product);
    this.loadBrandName();
  }

  fetchCartItems() {
    this.cartService.getCartByUserId(this.user.id).subscribe(
      (cart) => {
        if (cart) {
          this.cartId = cart.cartId; 
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              if (Array.isArray(response) && response.length >= 2) {
                const items = response[1];
                console.log(items);
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
  public addToCart(user,productReference: string, counter) {
    if (counter == 0) return false;
    console.log('Adding to cart...');
    this.cartService.addToCart(this.user.id, this.product.productReference, parseInt(counter)).subscribe(
      () => {
        this.close();
        console.log('Quantity updated successfully')
        this.cartService.getProductsAndQuantities(this.cartId).subscribe(
          (response: any[]) => {
            this.cartService.changeProductsAndQuantities(response);
          },
          error => {
            console.error('Error fetching cart items:', error);
          }
        );
    },
      error => console.error('Error updating quantity:', error)

    );
  }

  public close(): void {
    this.dialogRef.close();
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if(this.counter >1){
       this.counter -= 1;
    }
  }

     public buyNow() {
      this.router.navigate(['/product', this.product.productReference]);
      this.close();
   }
  loadBrandName() {
    this.productsService.getBrandByProductReference(this.product.productReference).subscribe(
      (brand) => {
        this.brandName = brand.brandName;
        console.log('brand name : ', this.brandName)
      },
      (error) => {
        console.error('Error loading brand name:', error);
      }
    );
  }

}
