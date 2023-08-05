import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutes } from './feedback.routing';
import {
  TuiReorderModule,
  TuiTableModule,
  TuiTablePaginationModule
} from '@taiga-ui/addon-table';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiProgressModule,
  TuiSelectModule,
  TuiTagModule,
  TuiTextAreaModule,
  TuiToggleModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiLetModule,
  TuiPortalModule,
  TuiValidatorModule
} from '@taiga-ui/cdk';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { FeedbackComponent } from './feedback.component';
import { TableComponent } from './table/table.component';
import { TableFiltersComponent } from './table-filters/table-filters.component';

@NgModule({
  declarations: [FeedbackComponent, TableComponent, TableFiltersComponent],
  imports: [
    FormsModule,
    CommonModule,
    FeedbackRoutes,
    TuiTableModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiLoaderModule,
    TuiHostedDropdownModule,
    TuiTagModule,
    TuiButtonModule,
    TuiReorderModule,
    TuiDropdownModule,
    TuiPaginationModule,
    TuiPortalModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiPortalModule,
    TuiTagModule,
    TuiToggleModule,
    TuiMarkerIconModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiProgressModule,
    TuiLetModule,
    TuiScrollbarModule,
    TuiValidatorModule,
    TuiTextAreaModule
  ]
})
export class FeedbackModule {}
