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
    emailValue: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    passwordValue: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  async login() {
    this.request
      .loginRequest(
        String(this.loginForm.get('emailValue')!.value),
        String(this.loginForm.get('passwordValue')!.value)
      )
      .subscribe(
        (response: any) => {
          if (response.auth) {
            // console.log(response.auth);
            this.alertService.open('Вы успешно вошли').subscribe();
            this.auth.successLogin(response);
          } else {
            this.alertService.open(response.error.error).subscribe();
          }
        },
        (error) => {
          this.alertService.open(error.error.error).subscribe();
        }
      );
  }
}
