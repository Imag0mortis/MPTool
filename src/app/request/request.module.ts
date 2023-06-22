import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request.component';
import { requestRoutes } from './request.routing';
import {
  TuiButtonModule,
  TuiPrimitiveTextfieldModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';

@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    TuiPrimitiveTextfieldModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiPrimitiveTextfieldModule,
    CommonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiMarkerIconModule,
    TuiSvgModule,
    TuiPrimitiveTextfieldModule,
    requestRoutes
  ]
})
export class RequestModule {}
