import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { ChoosenComponent } from './choosen/choosen.component';
import { LikerComponent } from './liker.component';
import { LikesComponent } from './likes/likes.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path: '',
    component: LikerComponent,
    children: [
      {
        path: '',
        component: LikesComponent
      },
      {
        path: 'basket',
        component: BasketComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'choosen',
        component: ChoosenComponent
      }
    ]
  }
];

export const LikerRoutes = RouterModule.forChild(routes);
