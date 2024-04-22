import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog-service/blog.service';

@Component({
  selector: 'app-blog-delete',
  templateUrl: './blog-delete.component.html',
  styleUrls: ['./blog-delete.component.sass']
})
export class BlogDeleteComponent implements OnInit {


  constructor(private BlogService :BlogService,
    private snackBar : MatSnackBar,
    private router : Router,
    private dialogRef: MatDialogRef<BlogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){

  }
  ngOnInit(): void {
      
  }

  deleteBlog(){
    this.BlogService.deleteBlog(this.data.id).subscribe(res=>{
      this.openSnackBar("Blog deleted Successfully !", 'success-snackbar');
      this.router.navigateByUrl('/blog-list');
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
}

