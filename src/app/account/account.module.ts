import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutes } from './account.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputCopyComponent,
  TuiInputCopyModule,
  TuiInputModule,
  TuiInputPasswordModule
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    AccountRoutes,
    TuiInputPasswordModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputCopyModule
  ]
})
export class AccountModule {}
