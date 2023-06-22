import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tokenRoutes } from './token.routing';
import { TokenComponent } from './token.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';

@NgModule({
  declarations: [TokenComponent],
  imports: [
    FormsModule,
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiAlertModule,
    TuiTableModule,
    tokenRoutes
  ]
})
export class TokenModule {}
