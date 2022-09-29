import { Routes, RouterModule } from '@angular/router';
import { CampaignsComponent } from './campaigns.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent,
  },
];

export const CampaignsRoutes = RouterModule.forChild(routes);
