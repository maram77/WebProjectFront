// reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      this.passwordResetService.resetPasswordRequest(email).subscribe(
        (response) => {
          if (response.message) {
            this.openSnackBar(response.message, 'success-snackbar');
          }
        },
        (errorResponse) => {
          if (errorResponse.error.error) {
            this.openSnackBar(errorResponse.error.error, 'error-snackbar');
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.resetPasswordForm);
    }
  }
  
  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', customClass] 
    });
  }
  
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
