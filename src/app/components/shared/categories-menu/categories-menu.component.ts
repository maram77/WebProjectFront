import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.sass']
})
export class CategoriesMenuComponent implements OnInit {
  categories: any[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(
        (data: any[]) => {
          this.categories = data;
        },
        (error) => {
          console.error('Error loading categories:', error);
        }
      );
  }
}
