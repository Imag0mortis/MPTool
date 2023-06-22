import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiSvgModule,
  TuiTextfieldCleanerDirective,
  TuiTextfieldControllerModule,
  TUI_SANITIZER
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiCheckboxModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule
} from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiForAsyncModule } from '@taiga-ui/cdk';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PoliticsComponent } from './politics/politics.component';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { RestoreComponent } from './restore/restore.component';
import { RestoreChangeComponent } from './restore-change/restore-change.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    RestoreComponent,
    PoliticsComponent,
    RestoreChangeComponent
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
    TuiTextfieldControllerModule,
    TuiCheckboxModule,
    TuiScrollbarModule,
    TuiInputPhoneModule
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    }
  ],
  exports: [SignUpComponent, RestoreComponent, RestoreChangeComponent]
})
export class AuthorizationModule {}
