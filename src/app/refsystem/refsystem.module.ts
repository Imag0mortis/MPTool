import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefsystemComponent } from './refsystem.component';
import { refsystemRoutes } from './refsystem.routing';
import {
  TuiAvatarModule,
  TuiInputModule,
  TuiPaginationModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiPrimitiveTextfieldModule,
  TuiTextfieldControllerModule,
  TUI_BUTTON_OPTIONS
} from '@taiga-ui/core';

@NgModule({
  providers: [
    {
      provide: TUI_BUTTON_OPTIONS,
      useValue: {
        appearance: 'flat',
        size: 'm',
        shape: 'rounded'
      }
    }
  ],
  declarations: [RefsystemComponent],
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiInputModule,
    TuiPrimitiveTextfieldModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    refsystemRoutes,
    TuiPaginationModule
  ]
})
export class RefsystemModule {}
