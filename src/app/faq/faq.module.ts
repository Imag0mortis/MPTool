import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { faqRoutes } from './faq.routing';
import { CabinetSetupComponent } from './cabinet-setup/cabinet-setup.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { AnswersComponent } from './answers/answers.component';

@NgModule({
  declarations: [
    FaqComponent,
    CabinetSetupComponent,
    ButtonsComponent,
    AnswersComponent
  ],
  imports: [TuiButtonModule, CommonModule, faqRoutes]
})
export class FaqModule {}
