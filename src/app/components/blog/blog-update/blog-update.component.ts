import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog-service/blog.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.sass'],
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
export class BlogUpdateComponent implements OnInit {
  editForm!: FormGroup;
  fileToUpload: File | null = null;
  imageUrl: string | undefined;
  constructor(
    private blogService :BlogService,
    private fb: FormBuilder,
    private router : Router,
    private snackBar : MatSnackBar,
    private dialogRef: MatDialogRef<BlogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ){

  }

  ngOnInit(){
    this.editForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description, Validators.required],
      image: [this.data.image]
    });
   /** this.fetchImage();*/ 
  }

  
  setFileData(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.fileToUpload = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({
          image: reader.result
        });
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }



  updateBlog(){
    const formData = {
      title: this.editForm.value.title,
      description: this.editForm.value.description,
      image: this.data.image,
      user: {
        id: this.editForm.value.userId
      }
    };
    const editdata = this.editForm.value;
    editdata.id=this.data.id
    this.blogService.updateBlog(this.data.id,formData).subscribe(res=>{
      this.uploadImage(this.data.id);
      this.openSnackBar("Blog Updated Successfully !", 'success-snackbar');
      window.location.reload();
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
    }else{ 
      console.error('image not exist');
    }
}
}
