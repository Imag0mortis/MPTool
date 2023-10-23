import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiDataListModule
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { TariffsModule } from './tariffs/tariffs.module';
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiSelectModule,
  TuiSliderModule,
  TuiTabsModule
} from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/kit';
import { TextMaskModule } from '@taiga-ui/kit';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CommonModule } from '@angular/common';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiInputCopyModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    TuiButtonModule,
    TextMaskModule,
    TuiInputModule,
    TuiTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    SharedModule,
    HttpClientModule,
    TariffsModule,
    CommonModule,
    FormsModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiInputModule,
    TuiMoneyModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSliderModule,
    TuiAutoFocusModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputCopyModule,
    TuiInputDateModule
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
