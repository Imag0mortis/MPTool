import { AppService } from './shared/services/app.service';
import { UserService } from './shared/services/user.service';
import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { RequestService } from './shared/services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    this.getData();
    this.appService.init();
    this.loadUsetifulScript(this.userId);
  }

  private loadUsetifulScript(userId: string): void {
    const usetifulTags = { userId };
    

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.usetiful.com/dist/usetiful.js';
    script.setAttribute('id', 'usetifulScript');
    script.dataset['token'] = 'ff8f5b44ca52aed9b607ddfd7484bcac';

    script.textContent = `window.usetifulTags = ${JSON.stringify(usetifulTags)};`;

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }

  getData() {
    this.requestService.getUserInfo().subscribe((r: any) => {
      this.userId = r.taskList;
    });
  }
}
