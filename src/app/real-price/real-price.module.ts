import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealPriceRoutes } from './real-price.routing';
import { RealPriceFiltersComponent } from './real-price-filters/real-price-filters.component';
import { RealPriceTableComponent } from './real-price-table/real-price-table.component';
import { RealPriceComponent } from './real-price.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';

@NgModule({
  declarations: [
    RealPriceComponent,
    RealPriceFiltersComponent,
    RealPriceTableComponent
  ],
  imports: [
    CommonModule,
    RealPriceRoutes,
    TuiInputModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiTableModule,
    TuiButtonModule
  ]
})
export class RealPriceModule {}
