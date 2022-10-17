import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './position.component';
import { PositionRoutes } from './position.routing';
import { PositionTableComponent } from './position-table/position-table.component';
import { PositionFiltersComponent } from './position-filters/position-filters.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';



@NgModule({
  declarations: [
    PositionComponent,
    PositionTableComponent,
    PositionFiltersComponent
  ],
  imports: [
    CommonModule,
    PositionRoutes,
    TuiInputModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiTableModule,
    TuiButtonModule
  ]
})
export class PositionModule { }
