import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.sass']
})
export class SetNewPasswordComponent implements OnInit {
  setNewPasswordForm: FormGroup;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private passwordResetService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.setNewPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
      }
    });
    document.body.classList.add('hide-header-footer');
  }

  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true }; 
    } else {
      return null;
    }
  }
  
  setNewPassword() {
    if (this.setNewPasswordForm.valid) {
      const newPassword = this.setNewPasswordForm.get('newPassword').value;
      this.passwordResetService.resetPassword(this.token, newPassword).subscribe(
        (response) => {
          this.openSnackBar(response.message, 'success-snackbar');
        },
        (error) => {
          this.openSnackBar(error.error, 'error-snackbar');
        }
      );
      this.setNewPasswordForm.reset();
    }
  }

  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', customClass] 
    });
  }
  ngOnDestroy(): void {
    document.body.classList.remove('hide-header-footer');
  }
}
