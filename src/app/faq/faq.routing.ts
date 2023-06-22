import { Routes, RouterModule } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';
import { FaqComponent } from './faq.component';

const routes: Routes = [
  {
    path: '',
    component: FaqComponent,
    children: []
  },
  {
    path: 'answers',
    component: AnswersComponent
  }
];

export const faqRoutes = RouterModule.forChild(routes);
