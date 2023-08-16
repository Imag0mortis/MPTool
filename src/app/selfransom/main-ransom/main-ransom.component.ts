import { Component, OnInit } from '@angular/core';
import { Observable, Subject, finalize, first, map, of, switchMap, timer } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { Inject, Injector } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { TuiAlertService } from '@taiga-ui/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TuiDialogService } from '@taiga-ui/core';
import {
  PolymorpheusContent,
  PolymorpheusComponent
} from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { BotModalComponent } from 'src/app/shared/modals/bot-modal/bot-modal.component';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { TuiFileLike } from '@taiga-ui/kit';
import { FormControl } from '@angular/forms';
import { TuiStringHandler } from '@taiga-ui/cdk';

interface mainransom {
  imgLink: string;
  price: number;
  priceTotal: number;
  quantityRemaining: number;
  quantityTotal: number;
  quantityReady: number;
  sku: number | null;
  skus: string[];
  taskID: number;
  taskState: string;
  taskStateNew: { count: number; state: string }[];
  deliveryQR: string | null; // Добавлено поле для QR-кода доставки
}

@Component({
  selector: 'app-main-ransom',
  templateUrl: './main-ransom.component.html',
  styleUrls: ['./main-ransom.component.scss']
})
export class MainRansomComponent implements OnInit {
  taskStates = [];
  cards: mainransom[] = [];
  activeItemIndex = 0;
  length = 0;
  index = 0;
  id = 0;
  state = '';
  popupActive: boolean;

  dictionary: readonly FilterOption[] = [
    { id: -1, state: 'Все' },
    { id: 0, state: 'Ожидает оплаты' },
    { id: 1, state: 'Товар доставляется' },
    { id: 7, state: 'Товар готов к выдаче' },
    { id: 2, state: 'Завершенный' },
    { id: 3, state: 'Ошибка' },
    { id: 4, state: 'Отменено' },
    { id: 8, state: 'Заказ отменен' },
    { id: 9, state: 'Не получен на ПВЗ' },
    { id: 5, state: 'Архив' },
  ];

  filterControl = new FormControl();
  stringify: TuiStringHandler<FilterOption> = option => option.state;

  searchTaskIds: string;
  page = 1;
  pageSize = 20;

  readonly control = new FormControl();
 
    readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
    readonly loadingFiles$ = new Subject<TuiFileLike | null>();
    readonly loadedFiles$ = this.control.valueChanges.pipe(
        switchMap(file => (file ? this.makeRequest(file) : of(null))),
    );
 
    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }
 
    removeFile(): void {
        this.control.setValue(null);
    }
 
    clearRejected(): void {
        this.removeFile();
        this.rejectedFiles$.next(null);
    }
 
    makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
        this.loadingFiles$.next(file);
 
        return timer(1000).pipe(
            map(() => {
                if (Math.random() > 0.5) {
                    return file;
                }
 
                this.rejectedFiles$.next(file);
 
                return null;
            }),
            finalize(() => this.loadingFiles$.next(null)),
        );
    }

    

  private readonly dialog = this.dialogService.open<number>(
    new PolymorpheusComponent(BotModalComponent, this.injector),
    {
      data: 237,
      dismissible: false,
      label: 'Уважаемый пользователь',
      size: 'l'
    }
  );

  filter: any = 0;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private request: RequestService,
    private http: HttpClient,
    private user: UserService,
    private readonly alertService: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    public appService: AppService,
    private requestService: RequestService
  ) {}

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }

  showVideoDialog(): void {
    this.dialogService
      .open(new PolymorpheusComponent(VideoModalComponent, this.injector), {
        size: 'page',
        closeable: true,
        dismissible: true
      })
      .subscribe();
  }

  onTabClick(arg?: number) {
    if (!arg) {
      arg = 0;
    }

    this.filter = arg;

    this.requestService
      .getAllSelfransomItem(this.page, this.pageSize, arg, '')
      .pipe(first())
      .subscribe((r: any) => {
        this.cards = r.taskList;
        this.length = r.tableData.pagesTotal;
      });
  }

  ngOnInit(): void {
    this.getData();
    this.getDataRansoms(this.page);

    if (this.popupActive === false) {
      this.showBotDialog();
    } else {
      //
    }
  }

  checkBot() {
    if (!this.popupActive) {
      this.showBotDialog();
    } else {
      // console.log('Popup is not active.');
    }
  }

  //Модальное окно
  getData() {
    this.request.getUserInfo().subscribe((r: any) => {
      // console.log('проверка', r);
      this.popupActive = r.is_push_tg_enabled;
      if (this.popupActive === false) {
        this.showBotDialog();
      } else {
        // console.log('Модальное окно неактивно.');
      }
    });
  }

  getTasksByIds(searchTaskIds: string) {
    const searchTaskString = [];

    this.getDataRansoms(this.page, this.filter, searchTaskIds);

    // console.log(this.filter);
  }

  clearTask() {
    this.searchTaskIds = '';

    this.getDataRansoms(this.page, this.filter);
  }

  goToPage(event: number) {
    this.index = event;
    this.getDataRansoms(event + 1);
  }

  base64ToData(base64String: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');
        context!.drawImage(image, 0, 0);

        const dataUrl = canvas.toDataURL();
        resolve(dataUrl);
      };

      image.onerror = (error) => {
        reject(error);
      };

      image.src = base64String;
    });
  }

  async getDataRansoms(
    page: number = this.page,
    filter = 0,
    searchTaskIds = ''
  ) {
    this.requestService
      .getAllSelfransomItem(page, this.pageSize, filter, searchTaskIds)
      // eslint-disable-next-line rxjs/no-async-subscribe
      .subscribe(async (r: any) => {
        this.cards = r.taskList;
        this.length = r.tableData.pagesTotal;
        this.taskStates = r.taskStates;
      });
  }

  showBotDialog(): void {
    this.dialog.subscribe({
      next: (data) => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      }
    });
  }

  buyPackages(quantity: number) {
    this.request
      .buySelfransomPackages('selfransom', quantity)
      .subscribe((r: any) => {
        if (r && r['result'] === 'ok') {
          const options: any = { label: 'Успешно!', status: 'success' };
          this.alertService.open(
            `Вы приобрели пакет на ${quantity} выкупов!`,
            options
          );
          this.user.updateUserInfo();
        }
      });
  }
  

  async downloadExcel(selectedFilterId: number) {
    const params = new HttpParams()
    .set('page', '1')
    .set('pageSize', '1000000')
    .set('filter', selectedFilterId.toString());

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Выкупы');
    const headers = [
      'Выкуп',
      'Получатель',
      'Телефон',
      'Код получения',
      'Номер заказа',
      'Адрес ПВЗ',
      'Время хранения',
      'Размер',
      'Артикул',
      'Название',
      'Статус товара',
      'Группа выкупов',
      'QR код доставки'
    ];
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.header = header;
      column.width = header.length + 5;
    });
  
    this.requestService.getSelfransomsExcel(params).subscribe((response) => {
      const ransoms = (response as any).ransoms;
  
      for (const ransom of ransoms) {
        const row = [
          ransom.buyID,
          ransom.customerName,
          ransom.customerPhone,
          ransom.customerPickupCode,
          ransom.orderID,
          ransom.pickupAddress,
          ransom.pickupExpireDate,
          ransom.size,
          ransom.sku,
          ransom.skuName,
          ransom.state,
          ransom.taskID,
          ransom.deliveryQR
        ];
  
        const lastRowNumber = worksheet.rowCount + 1;
        const lastRow = worksheet.getRow(lastRowNumber);
        lastRow.values = row;
  
        lastRow.eachCell({ includeEmpty: true }, (cell: any) => {
          cell.alignment = { wrapText: true };
          cell.wordWrap = true;
  
          worksheet.getRow(cell.row).height = 45;
          cell.alignment.horizontal = 'left';
          cell.alignment.vertical = 'top';
        });
  
        if (ransom.deliveryQR !== '') {
          const qrCellAddress = `M${lastRowNumber}`;
          const qrCell: any = worksheet.getCell(qrCellAddress);
          qrCell.value = {
            hyperlink: ransom.deliveryQR,
            text: 'Перейти'
          };
          qrCell.font = {
            color: { argb: 'FF0000FF' },
            underline: true
          };
          qrCell.alignment = { vertical: 'middle', horizontal: 'left' };
        }
      }
  
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, 'ransoms.xlsx');
      });
    });
  }
  

  openFileInput(): void {
    const fileInput: HTMLInputElement = document.getElementById('excelFile') as HTMLInputElement;
    fileInput.click();
  }
  
  importFile(event: any): void {
    const file: File = event.target.files[0];
    const fileReader: FileReader = new FileReader();
 
    fileReader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
    
      const requestBody = {
        task: jsonData.map(item => ({
          sku: item[0],
          name: item[1],
          price: item[2],
          quantity: item[3],
          size: item[4],
          query: item[5],
          sex: item[6],
          address: item[7],
        }))
      };
      this.requestService.createSelfransomTask(requestBody).subscribe(
        (response) => {
          console.log(response);
          location.reload();
          this.alertService
            .open('', {label: 'Выкупы успешно импортированы!'})
            .subscribe();
        },
        (error) => {
          console.error("Ау", error);
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService.open(
            'Произошла ошибка при импорте самовыкупов',
            options
          ).subscribe(() => {});
        }
      );
    };
    
    fileReader.readAsBinaryString(file);
    
  
    fileReader.readAsBinaryString(file);
  }
  
  downloadFile() {
    const fileUrl = '../../../../template.xlsx';
    const fileName = 'template.xlsx';

    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => saveAs(blob, fileName))
      .catch(error => console.error('Ошибка загрузки файла:', error));
  }


}

interface FilterOption {
  id: number;
  state: string;
}
