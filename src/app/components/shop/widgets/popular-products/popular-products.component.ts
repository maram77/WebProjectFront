import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from '../../../../services/product-service/product.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.sass']
})
export class PopularProductsComponent implements OnInit {

  public products: Product[];
  public product            :   Product = {};

   constructor(private productService: ProductService) { }

   ngOnInit() {
     this.productService.getProducts().subscribe(product => this.products = product);
   }
}
