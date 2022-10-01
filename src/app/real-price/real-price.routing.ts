import { Routes, RouterModule } from '@angular/router';
import { RealPriceComponent } from './real-price.component';

const routes: Routes = [
  {
    path: '',
    component: RealPriceComponent,
  },
];

export const RealPriceRoutes = RouterModule.forChild(routes);
