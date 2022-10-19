import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCorrectionComponent } from './score-correction.component';
import { ScoreCorrectionFiltersComponent } from './score-correction-filters/score-correction-filters.component';
import { ScoreCorrectionTableComponent } from './score-correction-table/score-correction-table.component';
import { ScoreCorrectionRoutes } from './score-correction.routing';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';

@NgModule({
  declarations: [
    ScoreCorrectionComponent,
    ScoreCorrectionFiltersComponent,
    ScoreCorrectionTableComponent
  ],
  imports: [
    CommonModule,
    ScoreCorrectionRoutes,
    TuiInputModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiTableModule,
    TuiButtonModule
  ]
})
export class ScoreCorrectionModule { }
