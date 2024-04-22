import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product';
import { ProductService } from '../../../services/product-service/product.service';
import { CartService } from '../../../services/cart-service/cart.service'

@Component({
  selector: 'app-home-two',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


  products: Product[];
  public banners = [];

  shoppingCartItems: Product[] = [];
  wishlistItems  :   Product[] = [];

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    {image: 'assets/images/carousel/banner2.jpg' },
    {  image: 'assets/images/carousel/banner5.jpg' },
    {image: 'assets/images/carousel/banner3.jpg' },
    {  image: 'assets/images/carousel/banner4.jpg' },
    {image: 'assets/images/carousel/banner1.jpg' }
  ];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.fetchProducts();

    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );
  }



fetchProducts() {
  this.productService.getAllProducts().subscribe(
    (data: any[]) => {
      this.products = data;
    },
    error => {
      console.error('Error fetching products:', error);
    }
  );
}





}