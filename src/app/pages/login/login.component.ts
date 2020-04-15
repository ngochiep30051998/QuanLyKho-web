import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../../services/helper/helper.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // errorMessage = 'required';
  public loginForm: FormGroup;
  public loading: boolean;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public helperService: HelperService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
  }
  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.helperService.markFormGroupTouched(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value).then((res: any) => {
      this.toastr.success('Đăng nhập thành công');
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      this.router.navigate(['trang-chu']);
      this.loading = false;
    }).catch(err => {
      console.log(err);
      this.loading = false;
      if (err.status === 401) {
        this.toastr.error(err.error.message);
      }
    });
  }

}
