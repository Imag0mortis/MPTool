import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { WbPosition } from 'src/app/shared/interfaces';
import { RequestService } from 'src/app/shared/services/request.service';
import { AppService } from 'src/app/shared/services/app.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-ransom',
  templateUrl: './create-ransom.component.html',
  styleUrls: ['./create-ransom.component.scss']
})
export class CreateRansomComponent {
  sku: number | undefined;
  data: WbPosition[] = [];
  numChars = 0;

  maxCountPositions = 100;

  maxCountAddresses = 5;

  columns = [
    'imgLink',
    'sku',
    'price',
    'name',
    'quantity',
    'size',
    'sex',
    'request',
    'address',
    'copy',
    'cancel'
  ];

  form: FormGroup;

  sexDict = [
    { name: 'Мужской', value: 0 },
    { name: 'Женский', value: 1 }
  ];
  copiedRowIndex: number;
  item: any;

  constructor(
    public appService: AppService,
    public positions: PositionsService,
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private request: RequestService,
    private app: AppService,
    private user: UserService,
    private fb: FormBuilder,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  private readonly dialog = this.dialogService.open<Address>(
    new PolymorpheusComponent(MapModalComponent, this.injector),
    {
      data: {
        addressId: 0,
        addressName: ''
      },
      dismissible: true,
      size: 'auto',
      closeable: true
    }
  );

  onPage(page: number): void {
    this.positions.page$.next(page);
    this.router.navigate(['/position'], {
      queryParams: {
        page: page + 1
      },
      queryParamsHandling: 'merge'
    });
  }

  showDialog(index?: number): void {
    this.dialog.subscribe({
      next: (data) => {
        if (index) {
          this.data[index].address = {
            addressId: data.addressId,
            addressName: data.addressName
          };
        } else {
          this.data.forEach((el) => {
            el.address = {
              addressId: data.addressId,
              addressName: data.addressName
            };
            return el;
          });
        }
      },
      complete: () => {
        console.log('Закрыли диалог');
      }
    });
  }

  clearAllAddresses() {
    this.data.forEach((el) => (el.address = undefined));
  }

  totalAmmount(): number {
    this.data.forEach((item) => {
      item.quantity = item.quantity || 1;
    });
    return this.data.reduce(
      (accumulator, el) => accumulator + el.quantity! * el.price,
      0
    );
  }

  servicePrice(): number {
    let total = 0;
    total = this.data.reduce(
      (accumulator, el) => accumulator + Number(el.quantity)!,
      0
    );
    let cost = 0;
    if (total > 0) {
      cost = this.user.tariffInfo[0].tariff.find(
        (el: any) => total >= el.minCount && total <= el.maxCount
      ).cost;
    }
    return total * cost;
  }

  countRequestCharacters(): number {
    const requestElement = document.querySelector(
      'td[*tuiCell="\'request\'"] input[tuiTextfield]'
    ) as HTMLInputElement;
    const requestValue = requestElement.value;
    return requestValue.length;
  }

  checkNewSKU() {
    //Если более this.maxCountPositions позиций - не добавляем и выводим алерт
    if (this.data.length < this.maxCountPositions) {
      this.request.checkSKU(this.sku!).subscribe(
        (r: WbPosition) => {
          const extendedResult = { ...r };
          extendedResult.quantity = 1;
          extendedResult.request = '';
          extendedResult.sex = {
            value: 0,
            name: 'Мужской'
          };

          for (let i = 0; i < r.sizes.length; i++) {
            extendedResult.sizes[i].Value = r.sizes[i].Value;
          }

          extendedResult.size = {
            name: extendedResult.sizes[0].Key,
            value: extendedResult.sizes[0].Value
          };

          if (this.data.length < this.maxCountPositions) {
            this.data.push(extendedResult);
          }
        },
        (e: unknown) => {
          const options: any = { status: 'error' };
          this.alertService.open('Товары не найдены!', options);
        }
      );
    } else {
      const options: any = { status: 'error' };
      this.alertService
        .open('Более ' + this.maxCountPositions + ' позиций! ', options)
        .subscribe();
    }
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  createTask() {
    const body: any[] = [];
    let validateOk = true;

    this.data.forEach((el, i: number) => {
      if (!el.address || !el.quantity || !el.request || el.quantity <= 0) {
        const options: any = { status: 'error' };
        this.alertService
          .open(
            'Заполнены не все поля,проверьте поисковой запрос, адрес и количество!',
            options
          )
          .subscribe();
        validateOk = false;
      } else {
        const item = {
          sku: el.sku,
          name: el.name,
          price: el.price,
          quantity: Number(el.quantity),
          query: el.request,
          sex: el.sex?.name,
          address: el.address?.addressName,
          size: el.sizes[0].Key.length === 0 ? '' : el.size.name
        };
        body.push(item);
      }
    });

    //Полный массив айдишников адресов

    let validateOkAddressCount = true;

    const arr: any[] = this.data.map((x) => x.address?.addressId);

    const result: Map<number | undefined, number> = new Map();

    arr.forEach((el) => {
      if (result.has(el)) {
        const valRes = result.get(el) as number;
        result.set(el, valRes + 1);

        if (valRes > this.maxCountAddresses) {
          validateOkAddressCount = false;
        }
      } else {
        result.set(el, 1);
      }
    });

    if (validateOk) {
      if (!validateOkAddressCount) {
        const options: any = { status: 'error' };
        this.alertService
          .open(
            'Вы выбрали более ' +
              this.maxCountAddresses +
              'товаров на один ПВЗ до приёма предыдущих заказов!',
            options
          )
          .subscribe();
      } else {
        this.request
          .createSelfransomTask({
            task: body
          })
          .subscribe(
            (r) => {
              this.user.updateUserInfo();
              this.app.goSelfRansom();
            },
            (e: unknown) => {
              const options: any = { status: 'error' };
              this.alertService.open('Ошибка создания!', options);
            }
          );
      }
    }
  }

  copySelfRansom(item: WbPosition): void {
    if (this.data.length < this.maxCountPositions) {
      const newItem = Object.assign({}, item);
      if (this.sku) {
        newItem.sku = this.sku;
        this.request.checkSKU(this.sku!).subscribe(
          (r: WbPosition) => {
            if (this.data.length < this.maxCountPositions) {
              this.data.push(newItem);
            }
          },
          (e: unknown) => {
            //alert("Ошибка создания!")

            const options: any = { status: 'error' };
            this.alertService.open('Ошибка создания!', options);
          }
        );
      }
    } else {
      const options: any = { status: 'error' };
      this.alertService
        .open('Более ' + this.maxCountPositions + ' позиций! ', options)
        .subscribe();
    }
  }

  removeRow(index: number) {
    this.data.splice(index, 1);
    if (index <= this.copiedRowIndex) {
      this.copiedRowIndex--;
    }
  }

  test() {
    console.log('Символы', this.countRequestCharacters());
  }
}

export interface Address {
  addressId: number;
  addressName: string;
}

interface AddressArr {
  addressId: number;
  addressCount: number;
}

function isInteger(arg0: number | undefined) {
  throw new Error('Function not implemented.');
}
