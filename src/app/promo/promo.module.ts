import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoComponent } from './promo.component';
import { PromoRoutes } from './promo.routing';
import { TuiAccordionModule, TuiAvatarModule, TuiCarouselModule, TuiIslandModule, TuiMarkerIconModule, TuiPaginationModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TariffsModule } from '../tariffs/tariffs.module';



@NgModule({
  declarations: [
    PromoComponent
  ],
  imports: [
    CommonModule,
    PromoRoutes,
    TuiCarouselModule,
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiButtonModule,
    TuiPaginationModule,
    FormsModule,
    TariffsModule,
    TuiAvatarModule,
    TuiAccordionModule
  ]
})
export class PromoModule { }
