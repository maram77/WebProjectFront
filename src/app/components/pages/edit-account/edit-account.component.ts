import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  
    confirmationvalidator = (group: FormGroup): { [s: string]: boolean } => {
      const password = group.get('password').value;
      const confirmPassword = group.get('confirmPassword').value;
      return password === confirmPassword ? null : { 'notSame': true };
    };
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
    ) { }
 
  ngOnInit(): void {
    this.userId = parseInt(LocalStorageService.getUser().id);
    this.loadUserData();
    this.createForm();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
            this.user = user;
            this.createForm();
        },
        error: (error) => console.error('Failed to fetch user data:', error)
    });
}



createForm() {
  this.updateForm = this.fb.group({
    firstname: [this.user.firstname, Validators.required],
    lastname: [this.user.lastname, Validators.required],
    email: [{value: this.user.email, disabled: true}, [Validators.required, Validators.email]],
    telephone: [this.user.telephone, Validators.required],
    password: ['', []], 
    confirmPassword: ['', []]
  }, {
    validator: this.editMode ? this.confirmationvalidator : null
  });

  if (!this.editMode) {
    this.updateForm.disable();
  }
}

toggleEditMode() {
  this.editMode = !this.editMode;
  if (this.editMode) {
    this.updateForm.enable();
    this.updateForm.get('email').disable();

  } else {
    this.updateForm.disable();
    this.updateForm.get('password').reset();
    this.updateForm.get('confirmPassword').reset();
  }
}
saveChanges() {
  if (this.updateForm.valid) {
    this.userService.updateUser(this.userId, this.updateForm.value).subscribe({
      next: (response) => { 
        this.openSnackBar(response.message, 'success-snackbar');  
        this.editMode = false;
        this.loadUserData();  
        this.updateForm.disable();
      },
      error: (error) => {
        console.error('Full error response:', error);
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else if (error.error && error.error.error) {
          errorMessage = error.error.error;
        } else if (error.status) {
          errorMessage = `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
        }
        this.openSnackBar(`Error updating profile: ${errorMessage}`, 'error-snackbar');
      }
    });
  }
}

  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', customClass] 
    });
  }
  cancelChanges() {
    this.editMode = false;
    this.createForm();
  }
}
