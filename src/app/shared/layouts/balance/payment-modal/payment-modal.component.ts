import { Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private request: RequestService
  ) {}

  summ = 0;
  email: string = this.context.data;

  pay() {
    // Open the window before starting the async call
    const paymentWindow = window.open();

    this.request
      .payment({
        pay: {
          sum: this.summ
        }
      })
      .subscribe(
        (r: any) => {
          // Set the location of the window to the URL you wish to redirect
          paymentWindow!.location.href = r.url;

          this.context.completeWith(false);
        },
        (e: unknown) => alert('Ошибка оплаты')
      );
  }

  changeSumm(arg: number) {
    this.summ = arg;
  }

  onClose(): void {
    this.context.completeWith(false);
  }
}
