import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikerComponent } from './liker.component';
import { LikerRoutes } from './liker.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintModule,
  TuiLoaderComponent,
  TuiLoaderModule,
  TuiPrimitiveTextfieldModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiTagModule,
  TuiSelectModule,
  TuiPaginationModule,
  TuiRadioLabeledModule,
  TuiTextareaModule
} from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { LikesComponent } from './likes/likes.component';
import { BasketComponent } from './basket/basket.component';
import { QuestionsComponent } from './questions/questions.component';
import { ChoosenComponent } from './choosen/choosen.component';
import { SharedModule } from '../shared/shared.module';
import { TuiTooltipModule } from '@taiga-ui/core';

@NgModule({
  declarations: [
    LikerComponent,
    LikesComponent,
    BasketComponent,
    QuestionsComponent,
    ChoosenComponent
  ],
  imports: [
    CommonModule,
    LikerRoutes,
    FormsModule,
    SharedModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTableModule,
    TuiButtonModule,
    TuiTagModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiPrimitiveTextfieldModule,
    TuiPaginationModule,
    TuiHintModule,
    TuiRadioLabeledModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiLoaderModule,
    TuiTextareaModule
  ]
})
export class LikerModule {}
