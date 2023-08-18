import {
  Component,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService
} from '@taiga-ui/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { first, repeat, Subscription, switchMap, takeWhile, tap } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { AddressMapComponent } from './address-map/address-map.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { SelfransomService } from 'src/app/shared/services/selfransom.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit, OnDestroy {
  @Input() data: RansomTask[] = [];
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private request: RequestService,
    @Inject(Injector) private readonly injector: Injector,
    public appService: AppService,
    private selfRansom: SelfransomService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  toogles: boolean[] = [];
  subscription: Subscription[] = [];
  public paymentQRsvg = '';
  public deliveryQRsvg = '';
  address = '';
  dialog: any;
  timerCheckQr: any;

  public trackingStatusV2: any;

  statesItem = [
    { name: 'Создан', nameFile: 'Created.svg', color: '' },
    { name: 'В пути', nameFile: 'Delivery.svg', color: '' },
    { name: 'Готов к выдаче', nameFile: 'house.svg', color: '' },
    { name: 'Вручен', nameFile: 'completed.svg', color: '' }
  ];

  ngOnInit(): void {
    for (let i = 0; i < this.data.length; i++) {
      this.toogles[i] = false;
    }
    this.checkOldQrState();
    this.timerCheckQr = setInterval(() => {
      this.checkOldQrState();
    }, 5000);
  }

  showQR(content: PolymorpheusContent<TuiDialogContext>, svg: string): void {
    this.paymentQRsvg = svg;
    this.dialogService.open(content).subscribe();
  }

  showDeliveryQR(
    content: PolymorpheusContent<TuiDialogContext>,
    svg: string,
    address: string
  ) {
    this.deliveryQRsvg = svg;
    this.address = address;
    this.dialogService.open(content).subscribe();
  }

  checkOldQrState() {
    let qrStorage: localQrStore[] = [];
    if (localStorage.getItem('paymentQRS')) {
      qrStorage = JSON.parse(localStorage.getItem('paymentQRS')!);
    }
    if (qrStorage.length > 0) {
      this.data.forEach((el) => {
        if (qrStorage.find((elem: localQrStore) => elem.id === el.buyID)) {
          const qr = qrStorage.find(
            (element: localQrStore) => element.id === el.buyID
          );
          if (qr!.date + 1000 * 60 * 5 > Date.now()) {
            el.paymentQR = qr?.qr;
            el.paymentState = PaymentQRState.ready;
          } else {
            el.paymentQR = undefined;
            el.paymentState = PaymentQRState.initial;
            qrStorage.splice(
              qrStorage.findIndex((elem: localQrStore) => elem.id === qr?.id),
              1
            );
          }
        }
      });
      localStorage.setItem('paymentQRS', JSON.stringify(qrStorage));
    }
  }

  checkPayment(index: number, buyID: number) {
    this.request.checkPayment(buyID).subscribe(
      (r) => {
        const options: any = {
          label: 'Информация о платеже принята',
          status: 'info'
        };
        this.alertService.open('', options);
        this.data[index].checkState = true;
      },
      (e: unknown) => {
        const options: any = {
          label: 'Произошла ошибка! Проверьте позднее!',
          status: 'error'
        };
        this.alertService.open('', options);
      }
    );
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  requestQR(index: number, id: number) {
    const paymentQR = localStorage.getItem('paymentQR');
    if (paymentQR != null && typeof paymentQR === 'string') {
      this.data[index].paymentQR = JSON.parse(paymentQR);
      return;
    }
    if (paymentQR != null) {
      this.data[index].paymentQR = JSON.parse(paymentQR);
      // console.log('кнопка', this.subscription);
      return;
    }

    this.subscription.push(
      this.request
        .getRequestQr(id)
        .pipe(
          switchMap((result: any) => {
            const options: any = { label: 'Создаём QR код!', status: 'info' };
            this.alertService
              .open('Бот ищет ваш товар, ожидайте код на оплату.', options)
              .subscribe();
            this.data[index].paymentState = PaymentQRState.wait;
            return this.request.getCheckQr(id).pipe(
              repeat({ delay: 3000 }),
              takeWhile((r: any) => r.resultState === 0, true),
              tap((response: any) => {
                if (response.searchState) {
                  this.data[index].searchState = response.searchState;
                  console.error(
                    'Invalid server response - searchState property is missing.'
                  );
                }
              })
            );
          })
        )
        .subscribe({
          next: (r: any) => {
            if (r.resultState !== 0) {
              this.data[index].paymentQR = r.paymentQR;
              let qrStorage: any = [];
              if (localStorage.getItem('paymentQRS')) {
                qrStorage = JSON.parse(localStorage.getItem('paymentQRS')!);
              }
              qrStorage.push({
                qr: this.data[index].paymentQR,
                date: Date.now(),
                id: this.data[index].buyID
              });

              localStorage.setItem('paymentQRS', JSON.stringify(qrStorage));
            } else {
              null;
            }
          },
          error: (e: unknown) => {
            const options: any = {
              label:
                'Произошла ошибка получения QR кода! Повторите попытку позднее!',
              status: 'error'
            };
            this.alertService.open('', options);
          },
          complete: () => {
            this.data[index].paymentState = PaymentQRState.ready;
            const options: any = { label: 'Код пришёл!', status: 'info' };
            this.alertService.open(
              'Пожалуйста оплатите выкуп в течении 5 минут, если вы не успеете нажмите кнопку заново',
              options
            );
          }
        })
    );
    tap((response: any) => {
      if (response.searchState) {
        this.data[index].searchState = response.searchState;
        console.error(
          'Invalid server response - searchState property is missing.'
        );
      }
      if (response.errorReason && typeof response.errorReason === 'string') {
        const options: any = { label: 'Ошибка!', status: 'danger' };
        this.alertService.open(response.errorReason, options).subscribe();
      }
    });
  }

  cancelTask(id: number) {
    this.request.cancelRansomTask(id).subscribe(
      (r) => {
        window.location.reload();
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

  showMap(address: string, pickupID: number) {
    this.selfRansom.allPointsReady$.subscribe((r) => {
      if (r) {
        const coords = this.selfRansom.findCurrentPoint(pickupID)?.coordinates;
        this.selfRansom
          .getDetailsData([pickupID])
          .pipe(first())
          // eslint-disable-next-line rxjs/no-nested-subscribe
          .subscribe(
            (result: any) => {
              const placemark = {
                geometry: coords,
                options: {
                  preset: 'islands#greenDotIcon',
                  iconColor: '#d020d6'
                },
                id: pickupID,
                properties: {
                  hintContent: 'Пункт выдачи с id: ' + pickupID,
                  balloonContent: `Адрес: ${address}<br>
                  График работы: ${result.value[pickupID].workTime}`
                },
                schedule: result.value[pickupID].workTime,
                address: address
              };

              this.dialog = this.dialogService
                .open<any>(
                  new PolymorpheusComponent(AddressMapComponent, this.injector),
                  {
                    data: {
                      placemark: placemark
                    },
                    dismissible: true,
                    size: 'auto'
                  }
                )
                // eslint-disable-next-line rxjs/no-nested-subscribe
                .subscribe({
                  complete: () => {
                    // console.log('Закрыли диалог');
                  }
                });
            },
            (error: unknown) => alert('Ошибка построения карты')
          );
      }
    });
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }

  showDialogTracking(
    content: PolymorpheusContent<TuiDialogContext>,
    trackingStatusV2: any
  ): void {
    this.trackingStatusV2 = trackingStatusV2;

    console.log(this.trackingStatusV2);

    this.dialogService.open(content).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((el) => el.unsubscribe());
    if (this.timerCheckQr) {
      clearInterval(this.timerCheckQr);
    }
  }
}

export enum PaymentQRState {
  initial = 'initial',
  wait = 'wait',
  ready = 'ready'
}

export interface RansomTask {
  address: string;
  buyID: number;
  customerCode: number;
  customerName: string;
  customerPhone: string;
  deliveryQR: string;
  pickupID: number;
  deliveryState: string;
  expireDate: string | any;
  imgLink: string;
  name: string;
  price: number;
  quantity: number;
  quantityRemaining: number;
  query: string;
  sex: string;
  size: string;
  sku: number;
  taskID: number;
  taskState: string;
  timeCreated: number;
  checkState?: boolean;
  userID: number;
  paymentState?: PaymentQRState;
  paymentQR?: string;
  searchState: string;
  errorReason: string;
  trackingStatus: Array<string> | any;
  trackingStatusV2: Array<any> | any;
}

interface localQrStore {
  qr: string;
  date: number;
  id: number;
}
