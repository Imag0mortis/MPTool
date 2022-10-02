import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { TuiButtonModule, TuiErrorModule, TUI_SANITIZER } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiForAsyncModule } from '@taiga-ui/cdk';



@NgModule({
  declarations: [
    LoginComponent
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
    TuiButtonModule
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ]
})
export class AuthorizationModule { }
