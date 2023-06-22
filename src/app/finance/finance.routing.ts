import { Routes, RouterModule } from '@angular/router';
import { FinanceComponent } from './finance.component';

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent
  }
];

export const FinanceRoutes = RouterModule.forChild(routes);
