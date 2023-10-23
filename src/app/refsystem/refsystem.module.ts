import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefsystemComponent } from './refsystem.component';
import { refsystemRoutes } from './refsystem.routing';
import {
  TuiAvatarModule,
  TuiInputModule,
  TuiIslandModule,
  TuiPaginationModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiPrimitiveTextfieldModule,
  TuiTextfieldControllerModule,
  TUI_BUTTON_OPTIONS,
  TuiHintModule
} from '@taiga-ui/core';
import { TuiInputCardGroupedModule, TuiInputCardModule, tuiCardNumberValidator } from '@taiga-ui/addon-commerce';
import { FormsModule } from '@angular/forms';
import { TuiValidatorModule } from '@taiga-ui/cdk';

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
    TuiPaginationModule,
    TuiIslandModule,
    TuiInputCardModule,
    FormsModule,
    TuiHintModule,
    TuiValidatorModule,
    TuiInputCardGroupedModule
  ]
})
export class RefsystemModule {}
