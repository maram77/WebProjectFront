import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/modals/product';
import { CartService } from '../../../../services/cart-service/cart.service';
import { ProductService } from '../../../../services/product-service/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-product-carousel-two',
  templateUrl: './product-carousel-two.component.html',
  styleUrls: ['./product-carousel-two.component.sass']
})
export class ProductCarouselTwoComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('product') products: Array<Product> = [];
  public config: SwiperConfigInterface = {};
  public productImages: any;
  user: any = {}; 

  constructor(
    private cartService: CartService,
    private productsService: ProductService,
    private wishlistService: WishlistService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.user.id = LocalStorageService.getUser().id;
  }

  
  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }
    }
  }

  // Add to cart
  public addToCart(user: any, product: Product,  quantity: number = 1) {
    this.cartService.addToCart(this.user.id,product.productReference,quantity);
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