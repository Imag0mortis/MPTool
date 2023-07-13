import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfransomComponent } from './selfransom.component';
import { SelfransomRoutes } from './selfransom.routing';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { MapModalComponent } from './map-modal/map-modal.component';
import { RansomCardComponent } from './ransom-card/ransom-card.component';
import { MainRansomComponent } from './main-ransom/main-ransom.component';
import { CreateRansomComponent } from './create-ransom/create-ransom.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiPrimitiveTextfieldModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiAvatarModule,
  TuiCarouselModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFilesModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputDateTimeModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputTimeModule,
  TuiIslandModule,
  tuiItemsHandlersProvider,
  TuiMarkerIconModule,
  TuiPaginationModule,
  TuiRatingModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiTabsModule,
  TuiTagModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiTableModule,
  TuiTablePaginationModule
} from '@taiga-ui/addon-table';
import { SharedModule } from '../shared/shared.module';
import { CardTableComponent } from './ransom-card/card-table/card-table.component';
import { AddressMapComponent } from './ransom-card/card-table/address-map/address-map.component';
import { TuiTooltipModule, TuiHintModule } from '@taiga-ui/core';
import { ReviewsComponent } from './reviews/reviews.component';
import { AvailableComponent } from './reviews/available/available.component';
import { PublishedComponent } from './reviews/published/published.component';
import { ReviewModalComponent } from './reviews/available/review-modal/review-modal.component';
import { RansomMainCardComponent } from './main-ransom/ransom-card/ransom-card.component';
import { ProductCardComponent } from './main-ransom/product-card/product-card.component';
import { VideoModalComponent } from './main-ransom/video-modal/video-modal.component';
import { TuiInputCopyModule } from '@taiga-ui/kit';
import { AwaitingComponent } from './reviews/awaiting/awaiting.component';
import { CanceledComponent } from './reviews/canceled/canceled.component';
import { ErrorComponent } from './reviews/error/error.component';

const mapConfig: YaConfig = {
  apikey: '136eb4f5-f723-42ba-bf7a-16d856667d78',
  lang: 'ru_RU'
};

@NgModule({
  declarations: [
    SelfransomComponent,
    MapModalComponent,
    RansomCardComponent,
    MainRansomComponent,
    CreateRansomComponent,
    CardTableComponent,
    AddressMapComponent,
    ReviewsComponent,
    AvailableComponent,
    PublishedComponent,
    ReviewModalComponent,
    RansomMainCardComponent,
    ProductCardComponent,
    VideoModalComponent,
    AwaitingComponent,
    CanceledComponent,
    ErrorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    TuiExpandModule,
    CommonModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    SelfransomRoutes,
    FormsModule,
    TuiTabsModule,
    TuiIslandModule,
    TuiAvatarModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTableModule,
    TuiTagModule,
    TuiPrimitiveTextfieldModule,
    TuiTablePaginationModule,
    TuiLoaderModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    TuiPaginationModule,
    SharedModule,
    TuiScrollbarModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiDialogModule,
    TuiPaginationModule,
    TuiScrollbarModule,
    TuiRatingModule,
    TuiTextAreaModule,
    TuiInputDateTimeModule,
    TuiInputFilesModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiFilesModule,
    TuiInputDateTimeModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiTextAreaModule,
    TuiInputDateTimeModule,
    TuiInputDateModule,
    TuiInputFilesModule,
    TuiFieldErrorPipeModule,
    TuiCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputCopyModule,
    TuiStepperModule,
    TuiMarkerIconModule,
    TuiSvgModule,
    TuiInputTimeModule,
    TuiAccordionModule,
    TuiInputDateRangeModule,
    TuiLinkModule,
    TuiLabelModule
  ]
})
export class SelfransomModule {}
