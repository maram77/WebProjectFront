// blog-comments.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../../../services/blog-service/comment.service';
import { CommentDeleteComponent } from '../../comment-delete/comment-delete.component';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.sass']
})
export class BlogCommentsComponent implements OnInit {

  blogId =  this.route.snapshot.params['id'];
  comments: any[];
  displayedColumns: string[] = ['comment', 'author', 'date', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getCommentsByBlog();
  }

  getCommentsByBlog() {
    this.commentService.getAllCommentsByBlog(this.blogId).subscribe(
      (res: any[]) => {
        this.comments = res;
        console.log(this.comments);
        this.sortCommentsByDate();
      },
      error => {
        this.openSnackBar("Something Went Wrong !", 'error-snackbar');
      }
    );
  }
  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', customClass] 
    });
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

  sortCommentsByDate() {
    this.comments.sort((a: any, b: any) => {
      return new Date(b.created_on).getTime() - new Date(a.created_on).getTime();
    });
  }
}
