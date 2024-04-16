import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../../../services/category.service';

@Component({
  selector: 'app-categoryfilter',
  templateUrl: './categoryfilter.component.html',
  styleUrls: ['./categoryfilter.component.sass']
})
export class CategoryfilterComponent implements OnInit {  
  categories: any[] = [];

  @Output() categoryChanged = new EventEmitter();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories()
      .subscribe(
        (data: any[]) => {
          if (Array.isArray(data) && data.length >= 2 && Array.isArray(data[1])) {
            this.categories = data[1];
            console.log('Categories:', this.categories);
          } else {
            console.error('Unexpected response format:', data);
          }
        },
        (error) => {
          console.error('Error loading categories:', error);
        }
      );
  }

  categorySelect(event) {
    this.categoryChanged.emit(event.value);
  }
}