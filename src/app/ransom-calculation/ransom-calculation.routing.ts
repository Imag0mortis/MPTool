import { Routes, RouterModule } from '@angular/router';
import { RansomCalculationComponent } from './ransom-calculation.component';

const routes: Routes = [
  {
    path: '',
    component: RansomCalculationComponent,
  },
];

export const RansomCalculationRoutes = RouterModule.forChild(routes);
