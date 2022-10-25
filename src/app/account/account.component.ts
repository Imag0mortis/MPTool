import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { first, switchMap } from 'rxjs';
import { RequestService } from '../shared/services/request.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  account: FormGroup;
  password: FormGroup;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private request: RequestService
  ) {
    this.account = fb.group({
      lastName: new FormControl(""),
      firstName: new FormControl(""),
      middleName: new FormControl(""),
      job: new FormControl(""),
      company: new FormControl(""),
      phone: new FormControl(),
      telegram: new FormControl(""),
    });

    this.password = fb.group({
      password: new FormControl(null, Validators.required),
      oldPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    }, { validators: this.checkPasswords });;
  }

  ngOnInit(): void {
    this.user.userSubj$.subscribe(
      r => {
        if (r?.self_info) {
          this.account.get('lastName')?.setValue(r.self_info.last_name)
          this.account.get('middleName')?.setValue(r.self_info.middle_name)
          this.account.get('firstName')?.setValue(r.self_info.name)
          this.account.get('phone')?.setValue(r.self_info.phone)
          this.account.get('telegram')?.setValue(r.self_info.telegram)
          this.account.get('company')?.setValue(r.self_info.company_name)
          this.account.get('job')?.setValue(r.self_info.company_position)
        }
      }
    )
  }

  setNewProfileData() {
    let body = {
      name: this.account.get('firstName')?.value,
      last_name: this.account.get('lastName')?.value,
      middle_name: this.account.get('middleName')?.value,
      company_name: this.account.get('company')?.value,
      company_position: this.account.get('job')?.value,
      phone: this.account.get('phone')?.value,
      telegram: this.account.get('telegram')?.value
    }
    this.request.setNewProfileData(body).pipe(
      switchMap(
        r => this.request.getUserInfo()
      ), first()).subscribe(
        r => this.user.setUserSubj = r
      )
  }

  setNewPassword() {
    if(!this.password.invalid) {
      this.request.setNewPassword(
        {
          old_password: this.password.get('oldPassword')?.value,
          new_password: this.password.get('password')?.value
        }
      ).subscribe(
        r => alert('Пароль успешно обновлён!'),
        e => alert('Ошибка обновления пароля')
      )
    }
    else alert('Проверьте правильность введенных данных: старый пароль обязателен, минимальная длина нового пароля 8 символов, новый пароль и подтверждение пароля должны совпадать')
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {

    let pass = group.get('oldPassword')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    
    return pass === confirmPass ? null : { notSame: true }
  }

}
