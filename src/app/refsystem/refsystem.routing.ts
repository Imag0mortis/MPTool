import { Routes, RouterModule } from '@angular/router';
import { RefsystemComponent } from './refsystem.component';

const routes: Routes = [
  {
    path: '',
    component: RefsystemComponent
  }
];

export const refsystemRoutes = RouterModule.forChild(routes);
