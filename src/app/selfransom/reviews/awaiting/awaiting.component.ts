import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { RansomTask } from '../../ransom-card/card-table/card-table.component';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { DateTime } from 'luxon';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

@Component({
  selector: 'app-awaiting',
  templateUrl: './awaiting.component.html',
  styleUrls: ['./awaiting.component.scss']
})
export class AwaitingComponent implements OnInit {
  data: RansomTask[] = [];
  tasks: TaskData[] = [];
  taskStates = [];
  activeItemIndex: number;
  sku: number | null;
  length: number;
  index: number;
  taskID: number;
  id: number;
  state = '';
  taskState: string;
  name: string;
  skuName: string;
  cards: any[] = [];
  items = [
    'по номеру выкупа',
    'по артикулу',
    'по имени',
    'по дате создания'
    // 'по дате публикации для опубликованных',
  ];

  testValue = new FormControl();

  page = 1;
  pageSize = 20;

  public tableData$: BehaviorSubject<any> = new BehaviorSubject(null);
  tableControl$ = new BehaviorSubject({});

  rateControl = new FormControl(2);
  rateValue = 2;
  searchSku: number | string = '';
  searchSkuName = '';
  currentTaskId: number;
  taskId: number;

  searchTaskId: number | string = '';

  dateCreatedRange: any = null;

  public readonly context: TuiDialogContext<any>;

  enableOrDisable(): void {
    if (this.rateControl.disabled) {
      this.rateControl.enable();
    } else {
      this.rateControl.disable();
    }
  }

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    public appService: AppService,
    private request: RequestService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.getData(this.page);
  }

  getData(page: number) {
    this.requestService
      .getAwaitingRewiews(page, this.pageSize)
      .subscribe((r: any) => {
        console.log(r);
        this.cards = r.feedbacks;
        this.length = r.tableData.pagesTotal;
        this.index = r.tableData.page - 1;
      });
  }

  searchReviews(
    page: number,
    sku: number | string,
    skuName: string,
    taskId: number | string,
    dateCreatedRange: any = ''
  ) {
    let dateCreatedMin: any = '';
    let dateCreatedMax: any = '';

    if (
      dateCreatedRange === null ||
      dateCreatedRange === undefined ||
      dateCreatedRange === ''
    ) {
      //let dateCreatedMin: any = '';
      //let dateCreatedMax: any = '';
    } else {
      const dateCreatedFrom = toControlValueTuiDateInput(dateCreatedRange.from);
      const dateCreatedTo = toControlValueTuiDateInput(dateCreatedRange.to);

      const date1 = new Date();
      if (
        toControlValueTuiDateInput(dateCreatedRange.from) === null ||
        toControlValueTuiDateInput(dateCreatedRange.to) == null
      ) {
        dateCreatedMin = '';
        dateCreatedMax = '';
      } else {
        dateCreatedMin = Date.parse(dateCreatedFrom) / 1000;
        dateCreatedMax =
          Date.parse(dateCreatedTo) / 1000 +
          23 * 3600 +
          59 * 60 +
          59 +
          60 * date1.getTimezoneOffset();
      }
    }

    this.requestService
      .getAwaitingRewiews(
        page,
        this.pageSize,
        sku,
        skuName,
        taskId,
        dateCreatedMin,
        dateCreatedMax
      )
      .subscribe((r: any) => {
        this.cards = r.feedbacks;
        this.length = r.tableData.pagesTotal;
      });
  }

  goToPage(event: number) {
    this.index = event;
    this.getData(event + 1);
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }

  cancelTask = (arg: string) => {
    const body = {
      buy_id: arg
    };
    this.requestService.cancelReview(parseInt(arg)).subscribe(
      (success) => {
        this.getData(this.page);
      },
      (error: any) => {
        //alert(123);
        const options: any = { label: 'Ошибка!', status: 'error' };
        console.log(error.error.errorDesc, options);
      }
    );
  };
}

function toControlValueTuiDateInput(day: TuiDay | null): string {
  return day ? day.toString('YMD', '-') : '';
}

interface reviews {
  buyID: number;
  customerName: string | null;
  feedbackState: number;
  image: string;
  sku: number;
  taskID: number;
  text: string;
  timeCreated: number;
  campaignsTotal: number;
  page: number;
  pageSize: number;
  pagesTotal: number;
}
