import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
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

  deleteComment(){
    this.CommentService.deleteComment(this.data.id).subscribe(res=>{
      this.snackBar.open("Comment deleted Successfully !","ok");
      window.location.reload();
    }, error=>{
      this.snackBar.open("Something Went Wrong !","ok");
    })
  }
}

