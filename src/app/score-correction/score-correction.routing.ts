import { Routes, RouterModule } from '@angular/router';
import { ScoreCorrectionComponent } from './score-correction.component';

const routes: Routes = [
  {
    path: '',
    component: ScoreCorrectionComponent,
  },
];

export const ScoreCorrectionRoutes = RouterModule.forChild(routes);
