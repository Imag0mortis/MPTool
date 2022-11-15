import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { LoginComponent } from './shared/authorization/login/login.component';
import { SignUpComponent } from './shared/authorization/sign-up/sign-up.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { WrapperComponent } from './shared/layouts/wrapper/wrapper.component';
import { TariffsComponent } from './tariffs/tariffs.component';

const routes: Routes = [
  { path: '', redirectTo: '/campaigns?page=1&pagesize=10', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'promo',
    loadChildren: () =>
      import('./promo/promo.module').then((m) => m.PromoModule),
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
        canActivateChild: [AuthGuard],
      },
      {
        path: 'position',
        loadChildren: () =>
          import('./position/position.module').then((m) => m.PositionModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'realprice',
        loadChildren: () =>
          import('./real-price/real-price.module').then((m) => m.RealPriceModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'ransom_calculation',
        loadChildren: () =>
          import('./ransom-calculation/ransom-calculation.module').then((m) => m.RansomCalculationModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'score_correction',
        loadChildren: () =>
          import('./score-correction/score-correction.module').then((m) => m.ScoreCorrectionModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'liker',
        loadChildren: () =>
          import('./liker/liker.module').then((m) => m.LikerModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'tariffs', component: TariffsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'basket', component: BasketComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
