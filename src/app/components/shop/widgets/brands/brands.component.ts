import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrandService } from '../../../../services/brand-service/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {

  brands: any[] = [];

  @Output() brandChanged = new EventEmitter();

  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getAllBrands()
      .subscribe(
        (data: any[]) => {
          if (Array.isArray(data)) {
            this.brands = data;
            console.log('Brands:', this.brands);
          } else {
            console.error('Unexpected response format:', data);
          }
        },
        (error) => {
          console.error('Error loading brands:', error);
        }
      );
  }

  brandSelect(event) {
    this.brandChanged.emit(event.value);
  }
}