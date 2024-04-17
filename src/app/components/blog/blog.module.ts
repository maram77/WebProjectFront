import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { SharedModule } from './../shared/shared.module';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';
import { CommentDeleteComponent } from './comment-delete/comment-delete.component';
import { MatCardModule, MatTooltipModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { BlogCommentsComponent } from './admin/blog-comments/blog-comments.component';



@NgModule({
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    SharedModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  declarations: [
    BlogDetailsComponent,
    BlogListComponent,
    BlogAddComponent,
    BlogUpdateComponent,
    BlogDeleteComponent,
    CommentDeleteComponent,
    AdminComponent,
    BlogCommentsComponent
  ]
})
export class BlogModule { }
