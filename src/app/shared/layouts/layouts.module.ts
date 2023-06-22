import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import {
  TuiAccordionModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiTagModule,
  TuiTreeModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDropdownModule,
  TuiExpandComponent,
  TuiExpandModule
} from '@taiga-ui/core';
import { BalanceComponent } from './balance/balance.component';
import { PaymentModalComponent } from './balance/payment-modal/payment-modal.component';
import { FormsModule } from '@angular/forms';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    WrapperComponent,
    BalanceComponent,
    PaymentModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TuiMarkerIconModule,
    TuiDropdownModule,
    TuiButtonModule,
    TuiInputModule,
    FormsModule,
    TuiTagModule,
    TuiTreeModule,
    TuiExpandModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiAccordionModule
  ],
  exports: [SidenavComponent, ToolbarComponent, WrapperComponent]
})
export class LayoutsModule {}
