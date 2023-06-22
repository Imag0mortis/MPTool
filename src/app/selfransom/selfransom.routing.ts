import { Routes, RouterModule } from '@angular/router';
import { CreateRansomComponent } from './create-ransom/create-ransom.component';
import { MainRansomComponent } from './main-ransom/main-ransom.component';
import { RansomCardComponent } from './ransom-card/ransom-card.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SelfransomComponent } from './selfransom.component';

const routes: Routes = [
  {
    path: '',
    component: SelfransomComponent,

    children: [
      {
        path: '',
        component: MainRansomComponent
      },
      {
        path: 'create',
        component: CreateRansomComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      },
      {
        path: ':id',
        component: RansomCardComponent
      }
    ]
  }
];

export const SelfransomRoutes = RouterModule.forChild(routes);
