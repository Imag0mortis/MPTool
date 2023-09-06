import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import { RequestService } from '../shared/services/request.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UserService } from 'src/app/shared/services/user.service';
import { AppService } from 'src/app/shared/services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService
} from '@taiga-ui/core';

@Component({
  selector: 'app-telegram-bot',
  templateUrl: './telegram-bot.component.html',
  styleUrls: ['./telegram-bot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramBotComponent implements OnInit {
  link = '';
  popupActive: boolean;
  linkinfo: any;
  telegram_id: number;
  linkedTgAccounts: Array<any>;

  linkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public appService: AppService,
    private request: RequestService,
    private ref: ChangeDetectorRef,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {
    this.linkForm = fb.group({
      linkInput: new FormControl('')
    });
  }

  ngOnInit(): void {
    // this.onCreateLinkClick();
    this.getData();
    this.generateLink('someType');
    console.log('код', this.link);
  }

  generateLink(type: string) {
    this.request.createTgLink(type).subscribe((response: any) => {
      this.link = response.tglink;
      this.ref.detectChanges();

      this.linkForm.get('linkInput')?.setValue(this.link);

      console.log('код', this.link);
    });
  }

  // test() {
  //   this.onCreateLinkClick();
  //   console.log('окно', this.popupActive);
  //   console.log('код', this.link);
  // }

  // onCreateLinkClick() {
  //   const quantity = 1;
  //   const type = 'someType';
  //   this.request.createTgLink(type).subscribe((response: any) => {
  //     console.log(response.tglink);
  //   });
  // }

  getData() {
    this.request.getUserInfo().subscribe((r: any) => {
      this.linkedTgAccounts = r.linked_tg;
      this.linkinfo = r.links
        ? r.links.map((links: any) => {
            return {
              link: links.is_push_tg_enabled
            };
          })
        : [];
    });
  }

  removeTg(telegram_id: number) {
    this.request.removeTgLink(telegram_id).subscribe(
      (r) => {
        const options: any = { label: 'Telegram отвязан', status: 'success' };
        this.alertService.open('', options);
        this.getData();
      },
      (e: unknown) => {
        const options: any = {
          label: 'Произошла ошибка отмены! Повторите попытку позднее!',
          status: 'error'
        };
        this.alertService.open('', options);
      }
    );
  }

  removeAllTg() {
    this.request.removeAllTgLink(this.telegram_id).subscribe(
      (r) => {
        const options: any = { label: 'Telegram отвязан', status: 'success' };
        this.alertService.open('', options);
      },
      (e: unknown) => {
        const options: any = {
          label: 'Произошла ошибка отмены! Повторите попытку позднее!',
          status: 'error'
        };
        this.alertService.open('', options);
      }
    );
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }
}
