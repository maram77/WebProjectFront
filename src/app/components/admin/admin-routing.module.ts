import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SidenavComponent } from '../admin/sidenav/sidenav.component';


const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: '', component: SidenavComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
