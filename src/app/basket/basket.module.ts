import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldIconDirective } from '@taiga-ui/core';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiPrimitiveTextfieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    AccountRoutes,
    TuiInputPasswordModule
  ]
})
export class BasketModule { }
