import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RansomCalculationFiltersComponent } from './ransom-calculation-filters/ransom-calculation-filters.component';
import { RansomCalculationTableComponent } from './ransom-calculation-table/ransom-calculation-table.component';
import { RansomCalculationComponent } from './ransom-calculation.component';
import { RansomCalculationRoutes } from './ransom-calculation.routing';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';



@NgModule({
  declarations: [
    RansomCalculationComponent,
    RansomCalculationFiltersComponent,
    RansomCalculationTableComponent
    
  ],
  imports: [
    CommonModule,
    RansomCalculationRoutes,
    TuiInputModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiTableModule,
    TuiButtonModule
  ]
})
export class RansomCalculationModule { }
