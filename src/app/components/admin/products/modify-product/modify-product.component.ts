import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product-service/product.service';
import { Product } from 'src/app/modals/product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../../services/category-service/category.service';
import { BrandService } from '../../../../services/brand-service/brand.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
  public product: Product;
  public brands: any[] = []; 
  public categories: any[] = []; 
  productForm: FormGroup;
  fileToUpload: File = null;

  constructor(
    public dialogRef: MatDialogRef<ModifyProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      color: [''],
      quantity: [''],
      brandId: [''],
      categoryId: [''],
      brandName: [''], 
      categoryName: [''],
      file: [null]
    });
  }

  ngOnInit() {
    if (this.data && this.data.productReference) {
      console.log('Product reference received:', this.data.productReference);
      this.getProductByReference(this.data.productReference.productReference);
    } else {
      console.error('No product reference provided.');
    }
    this.fetchAllBrands();
    this.fetchAllCategories();


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

  getProductByReference(productReference: string) {
    this.productService.getProductByReference(productReference).subscribe(
      (product: Product) => {
        this.product = product;
        this.populateFormWithProductData();
        this.fetchBrandName(this.product.brand);
        this.fetchCategoryName(this.product.category);
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  populateFormWithProductData() {
    this.productForm.patchValue({
      id: this.product.productReference,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      color: this.product.color,
      quantity: this.product.quantity,
      brandId: this.product.brand,
      categoryId: this.product.category,
      file: null 
    });
  }

  onSelectImage(event: any) {
    this.fileToUpload = event.target.files[0];
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
    formData.append('file', this.fileToUpload || '');

    this.productService.updateProduct(this.product.productReference, formData).subscribe(
      (product) => {
        console.log('Product updated:', product);
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  fetchBrandName(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe(
      (brand) => {
        this.productForm.patchValue({
          brandName: brand.brandName 
        });
      },
      (error) => {
        console.error('Error fetching brand name:', error);
      }
    );
  }
  fetchCategoryName(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (category) => {
        this.productForm.patchValue({
          categoryName: category.categoryName 
        });
      },
      (error) => {
        console.error('Error fetching brand name:', error);
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
  
  closeDialog() {
    this.dialogRef.close();
  }
}
