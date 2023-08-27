import { Inject, Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PaymentModalComponent } from '../layouts/balance/payment-modal/payment-modal.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 429) {
          this.alertService
            .open(
              'С вашего устройства поступает слишком много запросов, попробуйте через 10 секунд',
              {
                label: 'Ошибка!',
                status: 'error' as TuiNotification
              }
            )
            .subscribe();
        }

        // в скором времени буду обновлять ошибки
        // eslint-disable-next-line sonarjs/no-small-switch
        switch (error.error.errorID) {
          case 11:
            this.alertService
              .open('На счету недостаточно средств', {
                label: 'Ошибка!',
                status: 'error' as TuiNotification
              })
              .subscribe();
            this.dialogService
              .open<number>(
                new PolymorpheusComponent(PaymentModalComponent, this.injector),
                {
                  data: '',
                  dismissible: true,
                  size: 'auto'
                }
              )
              .subscribe();
            break;
          case 13:
            const options: any = { status: 'error' };
            this.alertService
              .open('Вы выбрали более ' + 5 + ' товаров на один ПВЗ!', options)
              .subscribe();
            break;
          default:
            break;
        }

        return throwError(error);
      })
    );
  }
}
