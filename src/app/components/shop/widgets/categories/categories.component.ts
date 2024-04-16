import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  @Output() categoryChanged: EventEmitter<{ name: string, id: number }> = new EventEmitter();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe((response: any[]) => {
        if (Array.isArray(response) && response.length >= 2 && Array.isArray(response[1])) {
          this.categories = response[1];
          console.log(this.categories); 
        } else {
          console.error('Unexpected response format:', response);
        }
      });
  }

  onCategorySelected(category: any): void {
    console.log('Category selected:', category);
    this.categoryChanged.emit({ name: category.categoryName, id: category.idCategory });
  }
}
