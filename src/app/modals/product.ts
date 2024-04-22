// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {
  productReference?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  color?: string;
  quantity?: number;
  brand?: any;
  brandName?: any;
  category?: any;
  categoryName?: any;


  constructor(
    productReference?: string,
    name?: string,
    description?: string,
    image?: string,
  price?: number,
    color?: string,
   quantity?: number,
    brand?: any,
    category?: any
  ) {
    this.productReference = productReference;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.color = color;
   this.quantity = quantity;
    this.brand = brand;
    this.category = category;
  }
}

// Color Filter
export interface ColorFilter {
  color?: ProductColor;
}
