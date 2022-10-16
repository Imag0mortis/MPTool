import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    public request: RequestService
  ) {
    this.loginForm = fb.group({
      emailValue: fb.control('',[Validators.required, Validators.email]),
      passwordValue: fb.control('', [Validators.required, Validators.minLength(8)]),
      passwordConfirmValue: fb.control('', [Validators.required]),
    },
    { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {

    let pass = group.get('passwordValue')?.value;
    let confirmPass = group.get('passwordConfirmValue')?.value;
    
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
  }

  get password() {
    return this.loginForm.controls
  }

  register() {
    this.request.registerRequest(this.loginForm.get('emailValue')!.value, this.loginForm.get('passwordValue')!.value).subscribe(
      r => {
        alert('успешно зарегистрированы!');
        this.appService.goLogin();
      },
      e => {
        alert('ошибка регистрации!')
      }
    )
  }

}
