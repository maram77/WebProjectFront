import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../services/auth-service/auth.service'
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
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
    private router :Router
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
  

  register(){
    this.authService.register(this.registerForm.value).subscribe((res) => {
      console.log(res);
    })
  }

  login(){
    this.authService.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value
    ).subscribe((res) => {
      console.log(res);
      if(LocalStorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("/admin/dashboard");
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
}