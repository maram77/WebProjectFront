import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.sass']
})
export class EditAccountComponent implements OnInit {
    user: any = {}; 
    editMode = false;
    updateForm !: FormGroup;
    userId: number; 

  
    confirmationvalidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true }
      } else if (control.value !== this.updateForm.controls['password'].value) {
        return { confirm: true, error: true }
      }
      return {}
    }
  constructor(private fb: FormBuilder,
    private userService: UserService
    ) { }
 
  ngOnInit(): void {
    this.loadUserData();
    this.createForm();
  }

  loadUserData() : void {
    this.user.firstname = LocalStorageService.getUser().firstname;
    this.user.lastname = LocalStorageService.getUser().lastname;
    this.user.email = LocalStorageService.getUser().email;
    this.user.telephone = LocalStorageService.getUser().telephone;
  }

 /* toggleEditMode() {
    this.editMode = !this.editMode;
  }*/
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.updateForm.enable();
    } else {
      this.updateForm.disable();
    }
  }

  createForm() {
    this.updateForm = this.fb.group({
      firstname: [{ value: '', disabled: !this.editMode }, Validators.required],
      lastname: [{ value: '', disabled: !this.editMode }, Validators.required],
      email: [{ value: '', disabled: !this.editMode }, [Validators.required, Validators.email]],
      telephone: [{ value: '', disabled: !this.editMode }, Validators.required],
      password: [{ value: '', disabled: !this.editMode }, Validators.required],
      confirmPassword: [''] // Add validators if needed
    });
  }

  saveChanges() {
    // Save changes to the user profile (e.g., send HTTP request to update user data)
    this.userId = parseInt(LocalStorageService.getUser().id|| ''); // Retrieve userId from localStorage
    this.userService.updateUser(this.userId,this.updateForm.value) .subscribe(
        (response) => {
          console.log('User information updated successfully');
          // After saving changes, disable edit mode
          this.editMode = false;
        },
        (error) => {
          console.error('Error updating user information:', error);
          // Handle error here
        }
      );
  }

  cancelChanges() {
    this.editMode = false;
  }
}
