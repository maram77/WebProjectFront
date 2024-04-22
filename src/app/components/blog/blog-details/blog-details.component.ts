import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog-service/blog.service';
import { CommentService } from '../../../services/blog-service/comment.service';
import { BlogUpdateComponent } from '../blog-update/blog-update.component';
import { BlogDeleteComponent } from '../blog-delete/blog-delete.component';
import { CommentDeleteComponent } from '../comment-delete/comment-delete.component';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.sass']
})
export class BlogDetailsComponent implements OnInit {


  blogId =  this.activateRoute.snapshot.params['id'];
  blogData:any;
  comments:any;
  commentForm!: FormGroup;
  Image:any;
  user: any = {}; 
  constructor(private BlogService :BlogService,
    private activateRoute: ActivatedRoute,
    private snackBar : MatSnackBar,
    private fb:FormBuilder,
    private router: Router,
    private commentService:CommentService,
    private dialog:MatDialog){
  }
  
  ngOnInit(){
    this.user.id = LocalStorageService.getUser().id;
    this.getPostById();
    this.loadBlogImage();
    console.log(this.blogId);
    this.commentForm = this.fb.group({
      content:[null, Validators.required],
    })
  }

  publishComment(){
    const content=this.commentForm.get('content')?.value;

    this.commentService.createComment(this.blogId,this.user.id,content).subscribe(res=>{   
      this.openSnackBar("Comment published Successfully !", 'success-snackbar');
         this.getCommentsByBlog();
     }, error=>{
      this.openSnackBar("Something Went Wrong !", 'error-snackbar');
     })
  }

  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', customClass] 
    });
  }

  getCommentsByBlog(){
    this.commentService.getAllCommentsByBlog(this.blogId).subscribe(res=>{     
      this.comments = res;
      console.log(res);
      this.sortCommentsByDate(); 
     }, error=>{
      this.openSnackBar("Something Went Wrong !", 'error-snackbar');
     })
  }
  
  getPostById(){
    this.BlogService.getBlogById(this.blogId).subscribe(res=>{     
      this.blogData = res;
      this.getCommentsByBlog();
     }, error=>{
      this.openSnackBar("Something Went Wrong !", 'error-snackbar');
     })
   }

  likeBlog(){
    this.BlogService.likeBlog(this.blogId).subscribe((response)=>{
      this.openSnackBar("liked !", 'success-snackbar');
      this.getPostById();
    }, (error)=>{
      this.openSnackBar("Something Went Wrong !", 'error-snackbar');
    })
  }

  sortCommentsByDate() {
    this.comments.sort((a: any, b: any) => {
      return new Date(b.created_on).getTime() - new Date(a.created_on).getTime();
    });
  }

  openEditForm(data:any){
    const dialogRef = this.dialog.open(BlogUpdateComponent, {
      data: data
    });    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.router.navigate(['/blog-details', this.blogId]);
      }
    });
  }

  deleteBlog(data:any){
    const dialogRef = this.dialog.open(BlogDeleteComponent, {
      data: data
    });    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
  
        this.router.navigate(['/blog-list']);
      }
    });
  }
  
 
 toggleEditMode(comment: any) {
  comment.isEditing = !comment.isEditing;
}


updateComment(comment: any) {
  this.commentService.updateComment(comment.id,comment.content).subscribe(
    (response) => {
      this.openSnackBar("Comment updated Successfully!", 'success-snackbar');
    },
    (error) => {
      this.openSnackBar("Something Went Wrong !", 'error-snackbar');
    }
  );
  this.toggleEditMode(comment); 
}

deleteComment(data:any){
  const dialogRef = this.dialog.open(CommentDeleteComponent, {
    data: data
  });    
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.router.navigate(['/blog-details', this.blogId]);
    }
  });
}


loadBlogImage() {
  this.BlogService.getBlogImageById(this.blogId).subscribe(
    (imageData) => {
      this.createImageFromBlob(imageData);
    },
    (error) => {
      console.error('Error loading blog image:', error);
    }
  );
}
createImageFromBlob(image: Blob) {
  let reader = new FileReader();
  reader.addEventListener('load', () => {
    this.Image = reader.result;
  }, false);
  if (image) {
    reader.readAsDataURL(image);
  }
}
isUserLoggedIn(): boolean {
  return LocalStorageService.isUserLoggedIn();
}

isAdminLoggedIn(): boolean {
  return LocalStorageService.isAdminLoggedIn();
}
}
