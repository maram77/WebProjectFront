import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {
  allBlogs: any[] = [];
  result: any[] = [];
  title: string = "";
  defaultImage: string = 'assets/images/blog/b1.jpg';

  constructor(private snackBar: MatSnackBar, private blogService: BlogService) { }

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(
      (res) => {
        this.allBlogs = res;
        console.log(this.allBlogs); // Log the response for debugging
        this.loadBlogImages();
      },
      (error) => {
        console.error("Error fetching blogs:", error); // Log any errors
        this.snackBar.open("Something Went Wrong !", "ok");
      }
    );
  }
  
  loadBlogImages() {
    this.allBlogs.forEach(blog => {
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
            blog.img = this.defaultImage; // Set default image if blog image is not found
          } else {
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
  
  searchByTitle() {
    if (this.title.trim() === "") {
      this.getAllBlogs(); 
    } else {
      this.blogService.searchByTitle(this.title).subscribe(
        (res) => {
          this.result = res;
          console.log(this.result);
          this.result.forEach((item) => {
            this.blogService.getBlogImageById(item.id).subscribe(
              (imageData) => {
                this.createImageFromBlog(imageData).then(imageUrl => {
                  item.img = imageUrl;
                }).catch(() => {
                  item.img = this.defaultImage; 
                });
              },
              (error) => {
                if (error.status === 404) {
                  item.img = this.defaultImage; 
                } else {
                  this.snackBar.open("Something Went Wrong with image  !", "ok");
                }
              }
            );
          });
        },
        (error) => {
          this.snackBar.open("Something Went Wrong !", "ok");
        }
      );
    }
  }
}  