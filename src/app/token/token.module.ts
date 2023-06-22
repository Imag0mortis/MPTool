import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tokenRoutes } from './token.routing';
import { TokenComponent } from './token.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiAlertModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import { TuiEditorImagePreviewModule } from '@taiga-ui/addon-editor';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [TokenComponent],
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiAlertModule,
    tokenRoutes
  ]
})
export class TokenModule {}
