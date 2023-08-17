import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {

      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe({
        next: (response) => {
          this.toastrService.info(response.message);
          localStorage.setItem("token", response.data.token);
        },
        error: (responseError) => {
          //console.log(responseError);
          this.toastrService.error(responseError.error);
        }
      });
    }
  }

}
