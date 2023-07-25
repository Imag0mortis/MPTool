import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { TestRoutes } from './test.routing';
import { TourTuiDropdownModule } from 'ngx-ui-tour-tui-dropdown';



@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    TourTuiDropdownModule,
    TestRoutes
  ]
})
export class TestModule { }
