import { AppService } from './shared/services/app.service';
import { UserService } from './shared/services/user.service';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { RequestService } from './shared/services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MPTool';
  userId: string;

  constructor(
    private requestService: RequestService,
    private appService: AppService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit() {
    this.appService.init();
  }
}
