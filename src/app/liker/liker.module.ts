import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikerComponent } from './liker.component';
import { LikerRoutes } from './liker.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiTagModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';



@NgModule({
  declarations: [
    LikerComponent
  ],
  imports: [
    CommonModule,
    LikerRoutes,
    FormsModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTableModule,
    TuiButtonModule,
    TuiTagModule
  ],
})
export class LikerModule { }
