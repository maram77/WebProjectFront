import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product-service/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product';


@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.sass']
})
export class ProductLeftSidebarComponent implements OnInit {
  public sidenavOpen:boolean = true;
  public animation    :   any;
  public sortByOrder  :   string = '';
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public colorFilters :   ColorFilter[] = [];

  public items        :   Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: Params) => {
        const category = params['category'];
       /* this.productService.getProductsByCategory(category).subscribe(products => {
       this.allItems = products;
       this.products = products;
       this.getTags(products)
       this.getColors(products)
        })*/
      }
    )
  }



     // Get current product tags
     public getTags(products) {
      var uniqueBrands = []
      var itemBrand = Array();
      products.map((product, index) => {
         if(product.tags) {
            product.tags.map((tag) => {
            const index = uniqueBrands.indexOf(tag);
            if(index === -1)  uniqueBrands.push(tag);
         })
        }
      });
      for (var i = 0; i < uniqueBrands.length; i++) {
           itemBrand.push({brand:uniqueBrands[i]})
      }
      this.tags = itemBrand
   }

     // Get current product colors
     public getColors(products) {
      var uniqueColors = []
      var itemColor = Array();
      products.map((product, index) => {
        if(product.color) {
        product.color.map((color) => {
            const index = uniqueColors.indexOf(color);
            if(index === -1)  uniqueColors.push(color);
        })
       }
      });
      for (var i = 0; i < uniqueColors.length; i++) {
           itemColor.push({color:uniqueColors[i]})
      }
      this.colors = itemColor
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const category = params['category'];
      this.productService.getAll().subscribe(products => {
        this.allItems = products;
        this.products = products;
        this.getColors(products);
        console.log('All Products:', this.products);

      });
    });
  }




  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
    // Animation Effect fadeIn
    public fadeIn() {
      this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
      this.animation = 'fadeOut';
  }

    // Update tags filter
    public updateTagFilters(tags: any[]) {
      this.tagsFilters = tags;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



    // sorting type ASC / DESC / A-Z / Z-A etc.
    public onChangeSorting(val) {
      this.sortByOrder = val;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
   }

     // Initialize filetr Items
  /*public filterItems(): Product[] {
    return this.items.filter((item: Product) => {
        const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
          if(item.color){
            if (item.color.includes(curr.color)) {
              return prev && true;
            }
          }
        }, true);
        const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
          if(item.tags) {
            if (item.tags.includes(curr)) {
              return prev && true;
            }
          }
        }, true);
        return Colors && Tags; // return true
    });

}*/

public onPageChanged(event){
  this.page = event;
  this.allItems;
  window.scrollTo(0,0);
}


  // Update price filter
//   public updatePriceFilters(price: any) {
//     let items: any[] = [];
//     this.products.filter((item: Product) => {
//         if (item.price >= price[0] && item.price <= price[1] )  {
//            items.push(item); // push in array
//         }
//     });
//     this.items = items;
// }


  // Update price filter
  public updatePriceFilters(price: any) {
    console.log(price);
    console.log(this.products);


   this.allItems = this.products.filter((item: Product) => {
     return item.price >= price.priceFrom && item.price <= price.priceTo
    });
     console.log(this.products);

}
selectedCategory: any;
selectedBrand : any;
onCategoryChanged(selectedCategory: any) {
  console.log('Selected Category:', selectedCategory);
  this.selectedCategory = selectedCategory;
  const selectedCategoryId = selectedCategory.idCategory;
  console.log('idcategory:', selectedCategoryId);
  console.log('All Products:', this.products);

  if (selectedCategory === 'all') {
    this.allItems = this.products;
  } else {
    this.allItems = this.products.filter(product => product.category === selectedCategoryId);
    console.log('Filtered Products by Category:', this.allItems);
  }
}

onBrandsChanged(selectedBrand: any) {
  console.log('Selected Brand:', selectedBrand);
  this.selectedBrand = selectedBrand;
  const selectedBrandId = selectedBrand.idBrand;
  console.log('idbrand:', selectedBrandId);
  if (selectedBrand === 'all') {
    this.allItems = this.products;
  } else {
    this.allItems = this.products.filter(product => {
      if (this.selectedCategory) {
        return product.brand === selectedBrandId && product.category === this.selectedCategory.idCategory;
      } else {
        return product.brand === selectedBrandId;
      }
    });
        console.log('Filtered Products by Brand and Category:', this.allItems);
  }
}
onColorChanged(selectedColors: string[]) {
  console.log('Selected Colors:', selectedColors);

  if (selectedColors.length === 0) {
    this.allItems = this.products;
    console.log('Showing all products:', this.allItems);
  } else {
    this.allItems = this.products.filter(product => {
      let colorMatch = selectedColors.includes(product.color);
      let categoryMatch = !this.selectedCategory || product.category === this.selectedCategory.idCategory;
      let brandMatch = !this.selectedBrand || product.brand === this.selectedBrand.idBrand;

      if (this.selectedCategory || this.selectedBrand) {
        return colorMatch && categoryMatch && brandMatch;
      } else {
        return colorMatch;
      }
    });
    console.log('Filtered products:', this.allItems);
  }
}






}
