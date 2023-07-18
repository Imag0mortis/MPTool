import { Routes, RouterModule } from '@angular/router';
import { LessonsComponent } from './lessons.component';

const routes: Routes = [
  {
    path: '',
    component: LessonsComponent
  }
];

export const lessonsRoutes = RouterModule.forChild(routes);