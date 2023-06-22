import { Routes, RouterModule } from '@angular/router';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { CampaignsComponent } from './campaigns.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent,
    pathMatch: 'prefix'
  },
  {
    path: ':id',
    component: CampaignCardComponent
  }
];

export const CampaignsRoutes = RouterModule.forChild(routes);
