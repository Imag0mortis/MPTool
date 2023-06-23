import { Component, OnInit } from '@angular/core';
import { async, first } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { Inject, Injector } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { TuiAlertService } from '@taiga-ui/core';
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
  dictionary: {
    0: { id: number; state: string };
    1: { id: number; state: string };
    2: { id: number; state: string };
    3: { id: number; state: string };
    4: { id: number; state: string };
    5: { id: number; state: string };
    6: { id: number; state: string };
  };
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

  dictionary = [
    { id: 0, state: 'Ожидает оплаты' },
    { id: 1, state: 'Товар доставляется' },
    { id: 7, state: 'Товар готов к выдаче' },
    { id: 2, state: 'Завершенный' },
    { id: 3, state: 'Ошибка' },
    { id: 4, state: 'Отменено' },
    { id: 8, state: 'Заказ отменен' },
    { id: 9, state: 'Не получен на ПВЗ' },
    { id: 5, state: 'Архив' },
    { id: -1, state: 'Все' }
  ];

  searchTaskIds: string;
  page = 1;
  pageSize = 20;

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
      console.log('Модальное окно неактивно.');
    }
  }

  checkBot() {
    if (!this.popupActive) {
      this.showBotDialog();
    } else {
      console.log('Popup is not active.');
    }
  }

  //Модальное окно
  getData() {
    this.request.getUserInfo().subscribe((r: any) => {
      console.log('проверка', r);
      this.popupActive = r.is_push_tg_enabled;
      if (this.popupActive === false) {
        this.showBotDialog();
      } else {
        console.log('Модальное окно неактивно.');
      }
    });
  }

  getTasksByIds(searchTaskIds: string) {
    const searchTaskString = [];

    this.getDataRansoms(this.page, this.filter, searchTaskIds);

    console.log(this.filter);
  }

  clearTask() {
    this.searchTaskIds = '';

    this.getDataRansoms(this.page, this.filter);
  }

  goToPage(event: number) {
    this.index = event;
    this.getDataRansoms(event + 1);
  }

  getDataRansoms(page: number = this.page, filter = 0, searchTaskIds = '') {
    this.requestService
      .getAllSelfransomItem(page, this.pageSize, filter, searchTaskIds)
      .subscribe((r: any) => {
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

  blobToDataURL(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  downloadExcel() {
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

    worksheet.addRow(headers);

    this.requestService.getSelfransomsExcel().subscribe((response) => {
      const ransoms = (response as any).ransoms;

      ransoms.forEach(async (ransom: any) => {
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
          ransom.taskID
        ];

        const base64Data = await this.blobToBase64(ransom.qrCode); // Преобразование Blob в base64
        const lastRow = worksheet.addRow(row);
        const imageCell = lastRow.getCell(13);
        (imageCell as any).value = {
          hyperlink: base64Data,
          text: 'QR код доставки',
          tooltip: 'QR код доставки'
        };
        imageCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFFFF' }
        };
        imageCell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        imageCell.alignment = { vertical: 'middle', horizontal: 'center' };
        (imageCell as any).width = 100;
        (imageCell as any).height = 100;
      });

      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, 'ransoms.xlsx');
      });
    });
  }
}
