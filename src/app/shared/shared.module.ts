import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './layouts/layouts.module';
import { AuthorizationModule } from './authorization/authorization.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [LayoutsModule, AuthorizationModule],
})
export class SharedModule { }
