import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';
import { CommentDeleteComponent } from './comment-delete/comment-delete.component';
import { AdminComponent } from './admin/admin.component';
import { BlogCommentsComponent } from './admin/blog-comments/blog-comments.component';
import { UserGuard } from 'src/app/guards/user-guard/user.guard';
import { AuthGuard } from 'src/app/guards/auth-guard/auth.guard';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'blog-list', component: BlogListComponent},
      { path: 'blog-details/:id', component: BlogDetailsComponent},
      { path: 'blog-Add', component: BlogAddComponent,canActivate: [AuthGuard]},
      { path: 'blog-update', component: BlogUpdateComponent},
      { path: 'blog-delete', component: BlogDeleteComponent},
      { path: 'comment-delete', component: CommentDeleteComponent},
      { path: 'admin-blog-list', component: AdminComponent},
      { path: 'blog-comments/:id', component: BlogCommentsComponent},



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogRoutingModule { }
