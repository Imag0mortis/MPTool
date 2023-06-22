import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './layouts/layouts.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { SafePipe } from './pipes/safe.pipe';
import { TariffsInfoPipe } from './pipes/tariffs-info.pipe';
import { BotModalComponent } from './modals/bot-modal/bot-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputCopyModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [SafePipe, TariffsInfoPipe, BotModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TuiInputCopyModule],
  exports: [LayoutsModule, AuthorizationModule, SafePipe, TariffsInfoPipe]
})
export class SharedModule {}
