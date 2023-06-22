import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceComponent } from './finance.component';
import { BotModalComponent } from '../shared/modals/bot-modal/bot-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputCopyModule,
  TuiInputModule,
  TuiPaginationModule
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { FinanceRoutes } from './finance.routing';

@NgModule({
  declarations: [FinanceComponent],
  imports: [TuiButtonModule, CommonModule, FinanceRoutes, TuiPaginationModule]
})
export class FinanceModule {}
