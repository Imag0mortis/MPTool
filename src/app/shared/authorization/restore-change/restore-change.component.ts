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
  templateUrl: './restore-change.component.html',
  styleUrls: ['./restore-change.component.scss']
})
export class RestoreChangeComponent {
  loginForm: FormGroup;
  account: FormGroup;
  //inviteParam: string;

  hashValidate = true;

  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    public request: RequestService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {
    //Прочитаем ссылку, если отсутствует hash, то выведем 404
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const link = searchParams.get('link');
    const csrf = searchParams.get('csrf');

    this.loginForm = fb.group(
      {
        passwordValue: fb.control('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        passwordConfirmValue: fb.control('', [
          Validators.required,
          Validators.minLength(8)
        ])
      },
      { validators: this.checkPasswords }
    );

    if (
      link == null ||
      link == undefined ||
      link == '' ||
      csrf == null ||
      csrf == undefined ||
      csrf == ''
    ) {
      this.hashValidate = false;
      const options: any = {
        label: 'Ошибка!',
        status: 'error',
        autoClose: false
      };
      this.alertService.open('Некорректная ссылка!', options).subscribe();
    } else {
      this.loginForm = fb.group(
        {
          //emailValue: fb.control('', [Validators.required, Validators.email]),
          passwordValue: fb.control('', [
            Validators.required,
            Validators.minLength(8)
          ]),
          passwordConfirmValue: fb.control('', [
            Validators.required,
            Validators.minLength(8)
          ])
        },
        { validators: this.checkPasswords }
      );
    }
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('passwordValue')?.value;
    const confirmPass = group.get('passwordConfirmValue')?.value;

    return pass === confirmPass ? null : { notSame: true };
  };

  get password() {
    return this.loginForm.controls;
  }

  restoreChange() {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const link = searchParams.get('link');
    const csrf = searchParams.get('csrf');

    this.request
      .restoreChangeRequest(
        this.loginForm.get('passwordValue')!.value,
        link!,
        csrf!
      )
      .subscribe(
        (r) => {
          console.log(r);

          const options: any = {
            label: 'Успешно изменили пароль!',
            status: 'success'
          };
          this.alertService
            .open('Вы сейчас будете перенаправлены на страницу логина', options)
            .subscribe();
          setTimeout(() => {
            this.appService.goLogin();
          }, 2000);

          /*
        let data = [
          {
            "log": `${this.loginForm.get('emailValue')!.value}`,
            "pass": `${this.loginForm.get('passwordValue')!.value}`,
            "phone": this.loginForm.get('phoneValue')?.value,
            "telegram": this.loginForm.get('telegramValue')?.value
          }
        ]
        let users = localStorage.getItem('users')
        if (users) {
          let newdata = JSON.parse(users)
          newdata.push(data[0])
          localStorage.setItem('users', JSON.stringify(newdata));
        }
        else localStorage.setItem('users', JSON.stringify(data));
        let options: any = {label: `Успешно зарегистрированы!`, status: 'success'}
        this.alertService.open(`Вы сейчас будете перенаправлены на страницу логина`, options).subscribe();
        setTimeout(() => {
          this.appService.goLogin();
        }, 2000)*/
        },
        (e: unknown) => {
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService
            .open('Пока не реализован backend!', options)
            .subscribe();
        }
      );
  }

  get validateForSame() {
    return !!(this.loginForm.errors && this.loginForm.errors['notSame']);
  }

  get validateForMinLength(): any {
    return !this.loginForm.get('passwordValue')?.errors;
  }
}
