import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './users/user.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { ProductsComponent } from './products/prodcuts.component';
import { ModifyProductComponent } from './products/modify-product/modify-product.component';
import { BrandsComponent } from './brands/brands.component';
import { ModifyBrandDialogComponent } from './brands/modify-brand-dialog/modify-brand-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { ModifyCategoryDialogComponent } from './categories/modify-category-dialog/modify-category-dialog.component';
import { AddproductComponent } from './addproduct/addproduct.component';

@NgModule({
  declarations: [
    UserComponent,
    OrdersComponent,
    EditdialogComponent,
    ProductsComponent,
    ModifyProductComponent,
    BrandsComponent, 
    ModifyBrandDialogComponent, 
    CategoriesComponent,
    ModifyCategoryDialogComponent,
    AddproductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModifyBrandDialogComponent,
    ModifyCategoryDialogComponent,
    ModifyProductComponent,
    EditdialogComponent
  ]
})
export class AdminModule { }
