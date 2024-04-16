import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { HomeComponent } from './home/home.component';


// Routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:category', component: ProductLeftSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent }



];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
