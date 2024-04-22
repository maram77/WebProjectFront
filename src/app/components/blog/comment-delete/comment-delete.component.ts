import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CommentService } from '../../../services/blog-service/comment.service';
@Component({
  selector: 'app-comment-delete',
  templateUrl: './comment-delete.component.html',
  styleUrls: ['./comment-delete.component.sass']
})
export class CommentDeleteComponent implements OnInit {


  constructor(private CommentService :CommentService,
    private snackBar : MatSnackBar,
    private router : Router,
    private dialogRef: MatDialogRef<CommentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){

  }
  ngOnInit(): void {
  }
  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', customClass] 
    });
  }
  deleteComment(){
    this.CommentService.deleteComment(this.data.id).subscribe(res=>{
      this.openSnackBar("Comment deleted Successfully !", 'success-snackbar');

      window.location.reload();
    }, error=>{
      this.openSnackBar("Something Went Wrong !", 'error-snackbar');
    })
  }
}

