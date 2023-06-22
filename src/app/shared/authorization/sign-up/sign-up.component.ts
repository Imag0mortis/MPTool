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
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
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
    this.loginForm = fb.group(
      {
        emailValue: fb.control('', [Validators.required, Validators.email]),
        passwordValue: fb.control('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        passwordConfirmValue: fb.control('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        phoneValue: new FormControl('', Validators.minLength(12)),
        telegramValue: new FormControl(''),
        privacyPolicy: new FormControl(false),
        termsOfUse: new FormControl(false)
      },
      { validators: this.checkPasswords }
    );
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

  register() {
    this.request
      .registerRequest(
        this.loginForm.get('emailValue')!.value,
        this.loginForm.get('passwordValue')!.value,
        this.loginForm.get('phoneValue')!.value,
        this.loginForm.get('telegramValue')!.value
      )
      .subscribe(
        (r) => {
          const data = [
            {
              log: `${this.loginForm.get('emailValue')!.value}`,
              pass: `${this.loginForm.get('passwordValue')!.value}`,
              phone: this.loginForm.get('phoneValue')?.value,
              telegram: this.loginForm.get('telegramValue')?.value
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
            label: 'Успешно зарегистрированы!',
            status: 'success'
          };
          this.alertService.open(
            'Вы сейчас будете перенаправлены на страницу логина',
            options
          );
          setTimeout(() => {
            this.appService.goLogin();
          }, 2000);
        },
        (e: unknown) => {
          console.log(e);
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService.open(
            'Произошла ошибка при отправке запроса! Повторите попытку позднее',
            options
          );
        }
      );
  }

  get validateForSame() {
    return !!(this.loginForm.errors && this.loginForm.errors['notSame']);
  }

  get validateForMinLength(): any {
    return !this.loginForm.get('passwordValue')?.errors;
  }

  get validatePrivacyPolicy(): any {
    return this.loginForm.get('privacyPolicy')!.value;
  }

  get validateTermsOfUse(): any {
    return this.loginForm.get('termsOfUse')!.value;
  }
}
