import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffsComponent } from './tariffs.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [TariffsComponent],
  imports: [
    CommonModule, 
    TuiButtonModule,
    TuiIslandModule
  ],
  exports: [TariffsComponent],
})
export class TariffsModule {}
