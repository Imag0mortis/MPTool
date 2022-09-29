import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsRoutes } from './campaigns.routing';
import { TuiReorderModule, TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiDataListWrapperModule, TuiInputModule, TuiSelectModule, TuiTagModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiDropdownModule, TuiHostedDropdownModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiPortalModule } from '@taiga-ui/cdk';
import { TableFiltersComponent } from './table-filters/table-filters.component';

@NgModule({
  declarations: [
    TableComponent,
    CampaignsComponent,
    TableFiltersComponent
  ],
  imports: [
    CommonModule, 
    CampaignsRoutes, 
    TuiTableModule,
    FormsModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiLoaderModule,
    TuiHostedDropdownModule,
    TuiTagModule, 
    TuiButtonModule,
    TuiReorderModule,
    TuiDropdownModule,
    TuiTablePaginationModule,
    TuiPortalModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule
  ]
})
export class CampaignsModule { }
