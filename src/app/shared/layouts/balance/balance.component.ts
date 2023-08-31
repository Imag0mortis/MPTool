import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { AppService } from '../../services/app.service';
import { UserService } from '../../services/user.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { RequestService } from '../../services/request.service';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
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
    @Inject(Injector) private readonly injector: Injector,
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

  showPaymentDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
}

  showDialog(): void {
    this.dialog.subscribe();
  }

  getPluralForm(
    number: number,
    oneForm: string,
    fewForm: string,
    manyForm: string
  ): string {
    if (number % 10 === 1 && number % 100 !== 11) {
      return oneForm;
    } else if (
      [2, 3, 4].includes(number % 10) &&
      ![12, 13, 14].includes(number % 100)
    ) {
      return fewForm;
    } else {
      return manyForm;
    }
  }
}

interface prepaid {
  selfransoms: number;
  feedbacks: number;
}
