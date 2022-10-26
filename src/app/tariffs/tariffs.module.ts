import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffsComponent } from './tariffs.component';
import { TuiButtonModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    TariffsComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule
  ]
})
export class TariffsModule { }
