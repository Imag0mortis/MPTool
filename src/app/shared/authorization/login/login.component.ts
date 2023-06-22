import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    public appService: AppService,
    private request: RequestService,
    private auth: AuthService,
    private alertService: TuiAlertService
  ) {}

  loginForm = new FormGroup({
    emailValue: new FormControl('', Validators.required),
    passwordValue: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  login() {
    this.request
      .loginRequest(
        String(this.loginForm.get('emailValue')!.value),
        String(this.loginForm.get('passwordValue')!.value)
      )
      .subscribe(
        (r) => this.auth.successLogin(r),
        (e: unknown) => {
          //alert('Ошибка входа')
          const options: any = { label: 'Ошибка входа!', status: 'error' };
          this.alertService.open('Ошибка входа!', options);
        }
      );
  }
}
