import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { Product } from "src/app/modals/product";
import { ProductService } from "../../../../services/product-service/product.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatDialog, MatSnackBar } from "@angular/material";
import { CartService } from "../../../../services/cart-service/cart.service";
import { SwiperDirective, SwiperConfigInterface } from "ngx-swiper-wrapper";
import { ProductZoomComponent } from "./product-zoom/product-zoom.component";
import { LocalStorageService } from "src/app/services/storage-service/local-storage.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.sass"],
})
export class ProductDetailsComponent implements OnInit {
  public config: SwiperConfigInterface = {};
  user: any = {};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  @ViewChild("zoomViewer", { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product: Product = {};
  public products: Product[] = [];

  public image: any;
  public zoomImage: any;

  public counter: number = 1;

  index: number;
  bigProductImageIndex = 0;
  brandName: string;

  cartId: number;
  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public productsService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      this.productsService.getProductByReference(id).subscribe((product) => {
        this.product = product;
        this.loadBrandName();
      });
    });
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.getRelatedProducts();
    this.user.id = LocalStorageService.getUser().id;
    this.fetchCartItems();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1,
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },
      },
    };
  }

  public openProductDialog(product, bigProductImageIndex) {
    let dialogRef = this.dialog.open(ProductZoomComponent, {
      data: { product, index: bigProductImageIndex },
      panelClass: "product-dialog",
    });
    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.router.navigate(["/products", product.id, product.name]);
      }
    });
  }

  public selectImage(index) {
    console.log(this.product);
    console.log(index);
    this.bigProductImageIndex = index;
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  getRelatedProducts() {
    this.productsService.getProducts().subscribe((product: Product[]) => {
      this.products = product;
    });
  }
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

  public buyNow(product: Product, quantity) {
    if (quantity > 0)
      this.cartService.addToCart(
        this.user.id,
        product.productReference,
        parseInt(quantity)
      );
    this.router.navigate(["/pages/checkout"]);
  }

  public addToCart(user, productReference: string, counter) {
    if (!LocalStorageService.isUserLoggedIn()) { 
      this.router.navigate(['/pages/my-account']);  
      this.openSnackBar("Please sign up or log in to add items to the cart!", 'info-snackbar'); 

    }else {
    if (counter == 0) return false;
    this.cartService
      .addToCart(this.user.id, this.product.productReference, parseInt(counter))
      .subscribe(
        () => {
          console.log("Quantity updated successfully");
          this.cartService.getProductsAndQuantities(this.cartId).subscribe(
            (response: any[]) => {
              this.cartService.changeProductsAndQuantities(response);
              this.openSnackBar(
                "Product added to cart successfully!",
                "success-snackbar"
              );
            },
            (error) => {
              console.error("Error fetching cart items:", error);
              this.openSnackBar("Something is wrong!", "error-snackbar");
            }
          );
        },
        (error) => console.error("Error updating quantity:", error)
      );
  }
}

  openSnackBar(message: string, customClass: string): void {
    this.snackBar.open(message, "Fermer", {
      duration: 3000,
      verticalPosition: "top",
      panelClass: ["custom-snackbar", customClass],
    });
  }

  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = (offsetX / image.offsetWidth) * 100;
      y = (offsetY / image.offsetHeight) * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + "% " + y + "%";
        zoomer.style.display = "block";
        zoomer.style.height = image.height + "px";
        zoomer.style.width = image.width + "px";
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: "zoom-dialog",
    });
  }
  loadBrandName() {
    this.productsService
      .getBrandByProductReference(this.product.productReference)
      .subscribe(
        (brand) => {
          this.brandName = brand.brandName;
        },
        (error) => {
          console.error("Error loading brand name:", error);
        }
      );
  }
}
