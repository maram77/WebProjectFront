import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { Product } from '../../../modals/product';
import { Router } from '@angular/router';
import { ModifyProductComponent } from './modify-product/modify-product.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category-service/category.service';
import { BrandService } from '../../../services/brand-service/brand.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public brandName          :   string;
  public brands: any[] = []; 
  public categories: any[] = []; 
   public newProduct: FormData = new FormData();
  public selectedFile: File | undefined;
  productForm: FormGroup;
  fileToUpload: File = null;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,private dialog: MatDialog, private brandService: BrandService,private categoryService: CategoryService) {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      color: [''],
      quantity: [''],
      brandId: [''],
      categoryId: [''],
      file: [null]
    });
  }
  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files[0];
      this.productForm.patchValue({
        file: this.fileToUpload
      });
    }
  }

  ngOnInit(): void {
    this.fetchAllProducts();
    this.fetchAllBrands();
    this.fetchAllCategories();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.productForm.get('id').value);
    formData.append('name', this.productForm.get('name').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('color', this.productForm.get('color').value);
    formData.append('quantity', this.productForm.get('quantity').value);
    formData.append('brandId', this.productForm.get('brandId').value);
    formData.append('categoryId', this.productForm.get('categoryId').value);
    formData.append('file', this.fileToUpload);
    console.log('Form Data:', formData); // Log form data

    this.productService.createProduct(formData).subscribe(
      (product) => {
        console.log('Product created:', product);
        this.productForm.reset();
        this.fetchAllProducts();
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  fetchAllProducts(): void {
    this.productService.getAll().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.loadBrandNames();
        this.loadCategoryNames();

        console.log('Fetched Products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  loadBrandNames(): void {
    this.products.forEach(product => {
      this.productService.getBrandByProductReference(product.productReference).subscribe(
        (brand) => {
          product.brandName = brand.brandName; 
        },
        (error) => {
          console.error('Error loading brand name for product:', product, error);
        }
      );
    });
  }
  loadCategoryNames(): void {
    this.products.forEach(product => {
      this.productService.getCategoryByProductReference(product.productReference).subscribe(
        (category) => {
          product.categoryName = category.categoryName; 
        },
        (error) => {
          console.error('Error loading category name for product:', product, error);
        }
      );
    });
  }
  deleteProduct(productReference: string): void {
    this.productService.deleteProduct(productReference).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.fetchAllProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
  modifyProduct(productReference: string): void {
    const dialogRef = this.dialog.open(ModifyProductComponent, {
      width: '400px',
      data: { productReference: productReference } 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.fetchAllProducts();
      }
    });
  }
  
  
  
  fetchAllBrands(): void {
    this.brandService.getAllBrands().subscribe(
      (brands: any[]) => {
        this.brands = brands;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }
  fetchAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}