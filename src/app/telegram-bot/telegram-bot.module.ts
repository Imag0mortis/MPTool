import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelegramBotComponent } from './telegram-bot.component';
import { TelegramBotRoutes } from './telegram-bot.routing';
import { BotModalComponent } from '../shared/modals/bot-modal/bot-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputCopyModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [TelegramBotComponent],
  imports: [
    CommonModule,
    FormsModule,
    TelegramBotRoutes,
    ReactiveFormsModule,
    TuiInputCopyModule,
    TuiButtonModule
  ]
})
export class TelegramBotModule {}
