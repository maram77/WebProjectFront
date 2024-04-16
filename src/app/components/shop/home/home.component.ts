import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';

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
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
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
      // Extract shopping cart items from the response
      this.shoppingCartItems = data[1];
      this.products = data[1];
      console.log(data[1]);
    },
    error => {
      console.error('Error fetching cart items:', error);
      // Handle error, e.g., display an error message to the user
    }
  );
}





}
