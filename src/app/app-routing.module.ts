import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './shared/layouts/wrapper/wrapper.component';

const routes: Routes = [
  { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'campaigns',
        loadChildren: () =>
          import('./campaigns/campaigns.module').then((m) => m.CampaignsModule),
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
      },
      {
        path: 'position',
        loadChildren: () =>
          import('./position/position.module').then((m) => m.PositionModule),
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
      },
      {
        path: 'realprice',
        loadChildren: () =>
          import('./real-price/real-price.module').then((m) => m.RealPriceModule),
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
