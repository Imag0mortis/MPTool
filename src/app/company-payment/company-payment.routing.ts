import { Routes, RouterModule } from '@angular/router';
import { CompanyPaymentComponent } from './company-payment.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyPaymentComponent
  }
];

export const CompanyPaymentRoutes = RouterModule.forChild(routes);
