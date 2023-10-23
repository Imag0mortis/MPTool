import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/authorization/login/login.component';
import { PoliticsComponent } from './shared/authorization/politics/politics.component';
import { SignUpComponent } from './shared/authorization/sign-up/sign-up.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { WrapperComponent } from './shared/layouts/wrapper/wrapper.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import { RestoreComponent } from './shared/authorization/restore/restore.component';
import { RestoreChangeComponent } from './shared/authorization/restore-change/restore-change.component';

const routes: Routes = [
  { path: '', redirectTo: '/selfransom', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'restore',
    component: RestoreComponent
  },
  {
    path: 'restore-change',
    component: RestoreChangeComponent
  },
  {
    path: 'politics',
    component: PoliticsComponent
  },
  {
    path: 'promo',
    loadChildren: () =>
      import('./promo/promo.module').then((m) => m.PromoModule)
  },
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'campaigns',
        loadChildren: () =>
          import('./campaigns/campaigns.module').then((m) => m.CampaignsModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'position',
        loadChildren: () =>
          import('./position/position.module').then((m) => m.PositionModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'realprice',
        loadChildren: () =>
          import('./real-price/real-price.module').then(
            (m) => m.RealPriceModule
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'selfransom',
        loadChildren: () =>
          import('./selfransom/selfransom.module').then(
            (m) => m.SelfransomModule
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'ransom_calculation',
        loadChildren: () =>
          import('./ransom-calculation/ransom-calculation.module').then(
            (m) => m.RansomCalculationModule
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'score_correction',
        loadChildren: () =>
          import('./score-correction/score-correction.module').then(
            (m) => m.ScoreCorrectionModule
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'liker',
        loadChildren: () =>
          import('./liker/liker.module').then((m) => m.LikerModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'tariffs',
        component: TariffsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'refsystem',
        loadChildren: () =>
          import('./refsystem/refsystem.module').then((m) => m.RefsystemModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'request',
        loadChildren: () =>
          import('./request/request.module').then((m) => m.RequestModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'token',
        loadChildren: () =>
          import('./token/token.module').then((m) => m.TokenModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./feedback/feedback.module').then((m) => m.FeedbackModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'feedback-token',
        loadChildren: () =>
          import('./feedback-token/feedback-token.module').then(
            (m) => m.FeedbackTokenModule
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'telegrambot',
        loadChildren: () =>
          import('./telegram-bot/telegram-bot.module').then(
            (m) => m.TelegramBotModule
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },

      {
        path: 'finance',
        loadChildren: () =>
          import('./finance/finance.module').then((m) => m.FinanceModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'lessons',
        loadChildren: () =>
          import('./lessons/lessons.module').then((m) => m.LessonsModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'company-payment',
        loadChildren: () =>
          import('./company-payment/company-payment.module').then(
            (m) => m.CompanyPaymentModule
          ),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
