import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog-service/blog.service';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.sass'],
  styles: [`
    .center-card {
      max-width: 600px;
      margin: auto;
      margin-top: 10px;
      padding: 30px;
    }

    mat-form-field {
      width: 100%;
    }

    .fileUploadContainer {
      padding: 10px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      width: 150px;
      height: 150px;
      border: dashed 1px #979797;
      text-align: center;
      justify-content: center;
    }

    .fileUploadContainer img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-height: 100%;
      max-width: 100%;
    }

    .fileUploadContainer .noImageContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 11px;
    }

    .fileUploadContainer .noImageContainer button {
      font-size: 11px;
    }

    .fileUploadContainer .deleteButton {
      position: absolute;
      z-index: 10;
      top: -25px;
      right: -10px;
      opacity: 50%;
    }

    .fileUploadContainer .fileInput {
      position: absolute;
      z-index: 9;
      opacity: 0;
      height: 100%;
      width: 100%;
      left: 0px;
      top: 0px;
      cursor: pointer;
    }
  `]
})
export class BlogAddComponent implements OnInit {
  postForm!: FormGroup;
  fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(5000)]],
      image: []
    });
  }

  setFileData(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.fileToUpload = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.postForm.patchValue({
          image: reader.result
        });
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }



  createBlog() {
    const formData = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
      image: '',
      user: {
        id: LocalStorageService.getUser().id 
      }
      
    };

    this.blogService.createBlog(formData).subscribe(
      (createdBlog) => {
  
        this.uploadImage(createdBlog.id);
        this.openSnackBar('Blog Created Successfully!', 'success-snackbar');
        this.router.navigate(['/blog/blog-list']);
      },
      (error) => {
        console.error('Error creating blog:', error);
        this.openSnackBar('Something Went Wrong!', 'success-snackbar');
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
  uploadImage(blogId: number) {
    if (this.fileToUpload) {
        this.blogService.uploadImage(blogId, this.fileToUpload).subscribe(
            () => {
                console.log('Image uploaded successfully');
                
            },
            (error) => {
                console.error('Error uploading image:', error);
            }
        );
    }else{    console.error('image not exist');}
}
}
