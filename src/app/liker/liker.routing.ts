import { Routes, RouterModule } from '@angular/router';
import { LikerComponent } from './liker.component';

const routes: Routes = [
  {
    path: '',
    component: LikerComponent,
  },
];

export const LikerRoutes = RouterModule.forChild(routes);
