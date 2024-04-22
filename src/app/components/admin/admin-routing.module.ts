import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guards/admin-guard/admin.guard';
import { UserComponent } from './users/user.component';
import { ProductsComponent } from './products/prodcuts.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { OrdersComponent } from './orders/orders.component';
import { AddproductComponent } from './addproduct/addproduct.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'users', component: UserComponent, canActivate: [AdminGuard]},
      { path: 'products', component: ProductsComponent, canActivate: [AdminGuard]},
      { path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard] },
      { path: 'brands', component: BrandsComponent, canActivate: [AdminGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard]},
      { path: 'addproduct', component: AddproductComponent, canActivate: [AdminGuard]},


    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
