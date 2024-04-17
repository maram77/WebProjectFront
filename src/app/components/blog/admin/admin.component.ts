import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from '../../../services/blog-service/blog.service';
import { BlogDeleteComponent } from '../blog-delete/blog-delete.component';
import { BlogUpdateComponent } from '../blog-update/blog-update.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  blogId: any;
  blogs: any[] = [];
  defaultImage: string = 'assets/images/blog/b1.jpg';
  displayedColumns: string[] = ['title', 'description', 'author', 'image', 'date', 'actions'];

  constructor(
    private blogService: BlogService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.blogId = this.activateRoute.snapshot.params['id'];
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe(
      (data) => {
        this.blogs = data;
        this.loadBlogImages();
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  loadBlogImages() {
    this.blogs.forEach(blog => {
      this.blogService.getBlogImageById(blog.id).subscribe(
        (imageData) => {
          this.createImageFromBlog(imageData).then(imageUrl => {
            blog.img = imageUrl;
          }).catch(() => {
            blog.img = this.defaultImage; // Set default image if loading fails
          });
        },
        (error) => {
          if (error.status === 404) {
            blog.img = this.defaultImage; 
            this.snackBar.open("Something Went Wrong with image  !", "ok");
          }
        }
      );
    });
  }
  
  createImageFromBlog(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  }

  editBlog(data: any): void {
    const dialogRef = this.dialog.open(BlogUpdateComponent, {
      data: data
    });    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.router.navigate(['/blog-details', this.blogId]);
      }
    });
  }

  deleteBlog(data: any): void {
    const dialogRef = this.dialog.open(BlogDeleteComponent, {
      data: data
    });    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/blog-list']);
      }
    });
  }


}
