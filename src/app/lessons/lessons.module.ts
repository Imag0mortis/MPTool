import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from './lessons.component';
import { lessonsRoutes } from './lessons.routing';
import { TuiTabBarModule } from '@taiga-ui/addon-mobile';
import { TuiIslandModule, TuiTabsModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    LessonsComponent
  ],
  imports: [
    CommonModule,
    lessonsRoutes,
    TuiTabBarModule,
    TuiIslandModule,
    TuiScrollbarModule,
    TuiTabsModule,
    TuiButtonModule
  ]
})
export class LessonsModule { }
