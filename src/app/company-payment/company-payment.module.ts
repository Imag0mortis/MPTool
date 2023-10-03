import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPaymentComponent } from './company-payment.component';
import { CompanyPaymentRoutes } from './company-payment.routing';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
  declarations: [CompanyPaymentComponent],
  imports: [
    CommonModule,
    CompanyPaymentRoutes,
    TuiInputModule,
    TuiButtonModule,
    TuiLoaderModule
  ]
})
export class CompanyPaymentModule {}
