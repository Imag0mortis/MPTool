import { Routes, RouterModule } from '@angular/router';
import { TelegramBotComponent } from './telegram-bot.component';

const routes: Routes = [
  {
    path: '',
    component: TelegramBotComponent
  }
];

export const TelegramBotRoutes = RouterModule.forChild(routes);
