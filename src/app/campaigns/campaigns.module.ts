import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsRoutes } from './campaigns.routing';
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
import { TableFiltersComponent } from './table-filters/table-filters.component';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { LogTableComponent } from './campaign-card/log-table/log-table.component';
import { TuiPaginationModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    TableComponent,
    CampaignsComponent,
    TableFiltersComponent,
    CampaignCardComponent,
    LogTableComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CampaignsRoutes,
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
export class CampaignsModule {}
