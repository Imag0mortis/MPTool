import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent {
  loginForm: FormGroup;
  account: FormGroup;
  //inviteParam: string;

  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    public request: RequestService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {
    this.loginForm = fb.group({
      emailValue: fb.control('', [Validators.required, Validators.email])
    });
  }

  get password() {
    return this.loginForm.controls;
  }

  restore() {
    this.request
      .restoreRequest(this.loginForm.get('emailValue')!.value)
      .subscribe(
        (r) => {
          const data = [
            {
              email: `${this.loginForm.get('emailValue')!.value}`
            }
          ];

          const users = localStorage.getItem('users');
          if (users) {
            const newdata = JSON.parse(users);
            newdata.push(data[0]);
            localStorage.setItem('users', JSON.stringify(newdata));
          } else {
            localStorage.setItem('users', JSON.stringify(data));
          }
          const options: any = {
            label: 'Ваш  запрос на восстановление пароля успешно отправлен!',
            status: 'success',
            autoClose: false
          };

          this.alertService.open('Проверьте почту!', options);
          /*this.alertService.open(`Вы сейчас будете перенаправлены на страницу логина`, options).subscribe();
        setTimeout(() => {
          this.appService.goLogin();
        }, 2000)*/
        },
        (e: unknown) => {
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService.open(
            'Произошла ошибка при отправке запроса на восстановление пароля!',
            options
          );
        }
      );
  }

  get validateForSame() {
    return !!(this.loginForm.errors && this.loginForm.errors['notSame']);
  }
}
