import { Routes, RouterModule } from '@angular/router';
import { TokenComponent } from './token.component';

const routes: Routes = [
  {
    path: '',
    component: TokenComponent
  }
];

export const tokenRoutes = RouterModule.forChild(routes);
