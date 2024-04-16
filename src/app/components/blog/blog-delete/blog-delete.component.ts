import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

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
      this.snackBar.open("Blog deleted Successfully !","ok");
      this.router.navigateByUrl('/blog-list');
    }, error=>{
      this.snackBar.open("Something Went Wrong !","ok");
    })
  }
}

