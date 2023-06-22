import { Routes, RouterModule } from '@angular/router';
import { PromoComponent } from './promo.component';

const routes: Routes = [
  {
    path: '',
    component: PromoComponent
  }
];

export const PromoRoutes = RouterModule.forChild(routes);
