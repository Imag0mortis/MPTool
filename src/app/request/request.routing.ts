import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './request.component';

const routes: Routes = [
  {
    path: '',
    component: RequestComponent
  }
];

export const requestRoutes = RouterModule.forChild(routes);
