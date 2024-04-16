// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {
  productReference?: string;
  name?: string;
  description?: string;
  image?: Uint8Array; // Representing byte array image data
  price?: number;
  color?: string;
  quantity?: number;
  brand?: any; // Generic object representing brand
  category?: any; // Generic object representing category

  constructor(
    productReference?: string,
    name?: string,
    description?: string,
    image?: Uint8Array,
    price?: number,
    color?: string,
   quantity?: number,
    brand?: any, // Generic object representing brand
    category?: any // Generic object representing category
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