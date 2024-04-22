import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { Category } from 'src/app/modals/category';
import { MatDialog } from '@angular/material/dialog';
import { ModifyCategoryDialogComponent } from './modify-category-dialog/modify-category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string;

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.getAllCategories();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
  

  openModifyCategoryDialog(categoryId: number, categoryName: string): void {
    const dialogRef = this.dialog.open(ModifyCategoryDialogComponent, {
      width: '400px',
      data: { categoryName: categoryName }
    });

    dialogRef.afterClosed().subscribe(newCategoryName => {
      if (newCategoryName) {
        this.updateCategory(categoryId, newCategoryName);
      }
    });
  }

  updateCategory(id: number, newCategoryName: string): void {
    this.categoryService.updateCategory(id, { categoryName: newCategoryName }).subscribe(
      () => {
        console.log('Category updated successfully');
        this.getAllCategories();
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
  addNewCategory(): void {
    if (this.newCategoryName && this.newCategoryName.trim() !== '') {
      this.categoryService.createCategory({ categoryName: this.newCategoryName }).subscribe(
        () => {
          console.log('Category created successfully');
          this.getAllCategories();
          this.newCategoryName = '';
        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    } else {
      console.warn('Please provide a category name');
    }
  }
  
}