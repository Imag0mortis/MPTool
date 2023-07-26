import { Routes, RouterModule } from '@angular/router';
import { FeedbackTokenComponent } from './feedback-token.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackTokenComponent
  }
];

export const feedbackTokenRoutes = RouterModule.forChild(routes);
