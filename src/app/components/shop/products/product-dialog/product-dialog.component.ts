import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/modals/product';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { User } from 'src/app/modals/user';

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

  constructor(private router: Router, public productsService: ProductService, private cartService: CartService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);
    console.log(this.product);

  }


  public addToCart(user:User ,productReference: string, quantity) {
    if (quantity == 0) return false;
    console.log('Adding to cart...');
    console.log('Product Reference:', productReference);
    console.log(quantity);
    this.cartService.addToCart(1, productReference, parseInt(quantity)).subscribe(
     
      () => {
        this.close();
        console.log('Quantity updated successfully')
        this.cartService.getProductsAndQuantities(1).subscribe(
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

}
