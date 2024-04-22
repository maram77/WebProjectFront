// brands.component.ts

import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand-service/brand.service';
import { MatDialog } from '@angular/material/dialog';
import { ModifyBrandDialogComponent } from './modify-brand-dialog/modify-brand-dialog.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {
  brands: any[];
  newBrandName: string;

  constructor(private brandService: BrandService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchAllBrands();
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

  deleteBrand(id: number): void {
    this.brandService.deleteBrand(id).subscribe(
      () => {
        console.log('Brand deleted successfully');
        this.fetchAllBrands();
      },
      (error) => {
        console.error('Error deleting brand:', error);
      }
    );
  }

  openModifyBrandDialog(brandId: number, brandName: string): void {
    const dialogRef = this.dialog.open(ModifyBrandDialogComponent, {
      width: '400px',
      data: { brandName: brandName }
    });

    dialogRef.afterClosed().subscribe(newBrandName => {
      if (newBrandName) {
        this.updateBrand(brandId, newBrandName);
      }
    });
  }

  updateBrand(id: number, newBrandName: string): void {
    this.brandService.updateBrand(id, { brandName: newBrandName }).subscribe(
      () => {
        console.log('Brand updated successfully');
        this.fetchAllBrands();
      },
      (error) => {
        console.error('Error updating brand:', error);
      }
    );
  }

addNewBrand(): void {
  if (this.newBrandName && this.newBrandName.trim() !== '') {
    this.brandService.createBrand({ brandName: this.newBrandName }).subscribe(
      () => {
        console.log('Brand created successfully');
        this.fetchAllBrands();
        this.newBrandName = '';
      },
      (error) => {
        console.error('Error creating brand:', error);
      }
    );
  } else {
    console.warn('Please provide a brand name');
  }
}

}