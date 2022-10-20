import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import {TuiMarkerIconModule} from '@taiga-ui/kit';
import { TuiDropdownModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    WrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TuiMarkerIconModule,
    TuiDropdownModule
  ],
  exports: [SidenavComponent, ToolbarComponent, WrapperComponent],
})
export class LayoutsModule { }