import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldCleanerDirective, TuiTextfieldControllerModule, TUI_SANITIZER } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiForAsyncModule } from '@taiga-ui/cdk';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    TuiErrorModule,
    TuiInputModule,
    ReactiveFormsModule,
    FormsModule,
    TuiFieldErrorPipeModule,
    TuiForAsyncModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiErrorModule,
    TuiTextfieldControllerModule
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ]
})
export class AuthorizationModule { }
