import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { RequestService } from '../../services/request.service';
import { Info } from 'luxon';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  email = '';
  info: prepaid[];
  selfransoms: number;
  feedbacks: number;

  constructor(
    public user: UserService,
    public appService: AppService,
    private requestService: RequestService,
    private request: RequestService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  private dialog: any;

  ngOnInit(): void {
    this.user.userSubj$.subscribe((r) => {
      this.email = r?.user_name;
      this.dialog = this.dialogService.open<number>(
        new PolymorpheusComponent(PaymentModalComponent, this.injector),
        {
          data: this.email,
          dismissible: true,
          size: 'auto'
        }
      );
    });
  }

  showDialog(): void {
    this.dialog.subscribe();
  }
}

interface prepaid {
  selfransoms: number;
  feedbacks: number;
}
