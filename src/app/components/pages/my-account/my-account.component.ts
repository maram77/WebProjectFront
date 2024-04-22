import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../services/auth-service/auth.service'
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent {
  registerForm !: FormGroup;
  loginForm !: FormGroup;

  confirmationvalidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.registerForm.controls['password'].value) {
      return { confirm: true, error: true }
    }
    return {}
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router :Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
  this.registerForm = this.fb.group({
  firstname: [null, [Validators.required]],
  lastname: [null, [Validators.required]],
  email: [null, [Validators.required, Validators.email]],
  telephone: [null, [Validators.required]],
  password: [null, [Validators.required]],
  confirmPassword: [null, [Validators.required, this.confirmationvalidator]]
  })

  this.loginForm = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
})
  }
  

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.openSnackBar("Please check your mailbox to verify your account", 'success-snackbar');
        console.log(res);
      },
      error: (error) => {
        console.error('Error:', error);
        this.openSnackBar(error.error, 'error-snackbar');
      },
      complete: () => this.resetForm()
    });
  }

  resetForm() {
    this.registerForm.reset();
  }

  login(){
    this.authService.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value
    ).subscribe((res) => {
      console.log(res);
      if(LocalStorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("/admin/users");
      } else if (LocalStorageService.isUserLoggedIn()) {
        this.router.navigateByUrl("");
      }
    }, error => {
      console.log(error);
      if(error.status == 406) {
        console.log("Account is not active. Please register first")
      } else {
        console.log("Bad crendentials")
      }
    })
   
  }
  openSnackBar(message: string, customClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', customClass] 
    });
  }
  
}