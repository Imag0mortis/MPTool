import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy, Inject} from '@angular/core';
import {TUI_IS_ANDROID, TUI_IS_IOS} from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
    providers: [
        {
            provide: TUI_IS_IOS,
            useValue: true,
        },
        {
            provide: TUI_IS_ANDROID,
            useValue: false,
        },
    ],
})

export class LessonsComponent implements OnInit {

  readonly items = [
    {
        text: 'Все',
    },
    {
        text: 'Непройденные',
    },
    {
        text: 'Пройденные',
    },
];

activeItemIndex = 0;

constructor(
  public appService: AppService
) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
