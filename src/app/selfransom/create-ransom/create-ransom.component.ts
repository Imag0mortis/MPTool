import {
  AfterViewInit,
  Component,
  Inject,
  Injector,
  OnInit,
  inject
} from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService
} from '@taiga-ui/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { MapModalComponent } from '../map-modal/map-modal.component';
import {
  PolymorpheusComponent,
  PolymorpheusContent
} from '@tinkoff/ng-polymorpheus';
import { WbPosition } from 'src/app/shared/interfaces';
import { RequestService } from 'src/app/shared/services/request.service';
import { AppService } from 'src/app/shared/services/app.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-ransom',
  templateUrl: './create-ransom.component.html',
  styleUrls: ['./create-ransom.component.scss']
})
export class CreateRansomComponent implements OnInit {
  //   {
  //     anchorId: 'sku-input',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Введите артикул',
  //     content: 'Введите артикул товара, который вы хотите добавить в список самовыкупов. Скопируйте его со страницы товара на маркетплейсе.',
  //   },
  //   {
  //     anchorId: 'head_button',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Добавьте товар',
  //     content: 'Нажмите на кнопку добавить выкуп',
  //   },
  //   {
  //     anchorId: 'quantity',
  //     title: 'Введите количество',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     content: 'Введите количество товара, который вы хотите добавить в самовыкуп.',
  //   },
  //   {
  //     anchorId: 'sizes',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Выберите размер',
  //     content: 'Выберите размер товара, если он предусмотрен. Если размер товара не предусмотрен, просто пропустите данный пункт.',
  //   },
  //   {
  //     anchorId: 'sex',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Выберите пол',
  //     content: 'Выбор пола предусматривает какого пола будет лицо, создавшее заказ',
  //   },
  //   {
  //     anchorId: 'request',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Укажите запрос.',
  //     content: 'Поисковый запрос имитирует поведение реального покупателя, а так же влияет на скорость получения QR-кода на оплату ботом.',
  //   },
  //   {
  //     anchorId: 'address',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Укажите адрес ПВЗ',
  //     content: 'Укажите адрес пункта выдачи заказов, на который будет осуществлена доставка. Нажмите далее.',
  //   },

  //   {
  //     anchorId: 'copy',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Копирование',
  //     content: 'Если в этом нет необходимости просто нажмите кнопку "далее".',
  //   },
  //   {
  //     anchorId: 'cancel',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     title: 'Вы можете удалить',
  //     content: 'Строку с задачей при необходимости. Нажмите кнопку "далее".',
  //   },
  //   {
  //     anchorId: 'create_task',
  //     prevBtnTitle: 'Назад',
  //     nextBtnTitle: 'Далее',
  //     endBtnTitle: 'Закрыть',
  //     title: 'Теперь вы можете',
  //     content: 'Создать данную задачу с выкупами. Вы сможете увидеть её на главном экране раздела самовыкупов.',
  //   },
  // ];
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

  ngOnInit(): void {
    this.item.sex = null;
  }

  onSexChange(newValue: number) {
    this.item.sex = newValue;
  }

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
      complete: () => {}
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
          extendedResult.sex = undefined;

          // console.log(r);

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
          this.alertService.open('Товары не найдены!', options).subscribe();
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
      if (
        !el.address ||
        !el.quantity ||
        !el.request ||
        el.quantity <= 0 ||
        !el.sex
      ) {
        const options: any = { status: 'error' };
        this.alertService
          .open(
            'Заполнены не все поля, проверьте поисковой запрос, адрес, количество и пол!',
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

  showExcelDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }

  openFileInput(): void {
    const fileInput: HTMLInputElement = document.getElementById(
      'excelFile'
    ) as HTMLInputElement;
    fileInput.click();
  }

  importFile(event: any): void {
    const file: File = event.target.files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1
      });

      // Filter out empty arrays
      const nonEmptyArrays = jsonData.filter((item) =>
        item.some(
          (value: string | undefined) => value !== undefined && value !== ''
        )
      );

      if (nonEmptyArrays.length === 0) {
        console.log('No data found in the file.');
        return;
      }

      const requestBody = {
        task: nonEmptyArrays.map((item) => ({
          sku: item[0],
          name: item[1],
          price: item[2],
          quantity: item[3],
          size: item[4],
          query: item[5],
          sex: item[6],
          address: item[7]
        }))
      };

      this.request.createSelfransomTask(requestBody).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['selfransom']);
          this.alertService
            .open('', { label: 'Выкупы успешно импортированы!' })
            .subscribe();
        },
        (error) => {
          console.error('Ау', error);
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService
            .open('Произошла ошибка при импорте самовыкупов', options)
            .subscribe(() => {});
        }
      );
    };

    fileReader.readAsBinaryString(file);
  }

  downloadFile() {
    const fileUrl = '../../../assets/template.xlsx';
    const fileName = 'template.xlsx';

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => saveAs(blob, fileName))
      .catch((error) => console.error('Ошибка загрузки файла:', error));
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
