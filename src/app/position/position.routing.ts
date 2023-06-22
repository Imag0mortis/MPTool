import { Routes, RouterModule } from '@angular/router';
import { PositionComponent } from './position.component';

const routes: Routes = [
  {
    path: '',
    component: PositionComponent
  }
];

export const PositionRoutes = RouterModule.forChild(routes);
