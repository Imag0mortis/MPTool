import { Component, OnInit } from '@angular/core';
import { AppService } from './shared/services/app.service';
import { UserService } from './shared/services/user.service';
import { ChangeDetectionStrategy, Inject, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MPTool';

  constructor(
    private appService: AppService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit() {
    this.appService.init();
  }
}
