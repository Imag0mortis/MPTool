import { Component, OnInit, Inject, Injector, Input } from '@angular/core';
import {
  TuiAlertService,
  TuiDialogService,
  TuiDialogSize
} from '@taiga-ui/core';
import { AppService } from 'src/app/shared/services/app.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, first } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RansomTask } from '../../ransom-card/card-table/card-table.component';
import { LikerReviewsTask } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.scss']
})
export class AvailableComponent implements OnInit {
  isLoading = true;
  form: FormGroup;
  data: RansomTask[] = [];
  taskStates = [];
  cards: any[] = [];
  activeItemIndex: number;
  length: number;
  index: number;
  taskID: number;
  id: number;
  state = '';
  taskState: string;
  name: string;
  sku: number;
  skuName: string;
  searchSku: number | string = '';
  searchSkuName = '';
  searchValue = '';
  items = [
    // 'по номеру выкупа',
    'по артикулу',
    'по имени'
    // 'по дате создания',
    // 'по дате публикации для опубликованных',
  ];

  public tableData$: BehaviorSubject<any> = new BehaviorSubject(null);
  tableControl$ = new BehaviorSubject({});
  photos: any;
  page = 1;
  pageSize = 20;

  constructor(
    public user: UserService,
    public appService: AppService,
    private requestService: RequestService,
    private request: RequestService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private userService: UserService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  get isMobile() {
    let isMobile: boolean;
    document.body.clientWidth > 768 ? (isMobile = false) : (isMobile = true);
    return isMobile;
  }

  private dialog: any;

  onTabClick(arg?: number) {
    this.requestService
      .getAvailableFeedbacks(this.page, this.pageSize)
      .pipe(first())
      .subscribe((r: any) => {
        this.cards = r.taskList;
        this.length = r.tableData.pagesTotal;
      });
  }

  ngOnInit(): void {
    this.getData(this.page);
  }

  getData(page: number) {
    this.requestService
      .getAvailableFeedbacks(page, this.pageSize)
      .pipe(first())
      .subscribe((r: any) => {
        console.log(r);
        this.isLoading = true;
        this.cards = r.taskList;
        this.length = r.tableData.pagesTotal;
        this.index = r.tableData.page - 1;
      });
  }

  searchReviews(page: number, sku: number | string, skuName: string) {
    this.requestService
      .getAvailableFeedbacks(page, this.pageSize, sku, skuName)
      .subscribe((r: any) => {
        console.log(r);
        this.cards = r.taskList;
        this.length = r.tableData.pagesTotal;
        this.index = r.tableData.page - 1;
      });
  }

  showDialog(
    skuName: string,
    sku: number,
    taskID: number,
    available: { male: number; female: number },
    menId: number,
    femaleId: number,
    sized: boolean
  ): void {
    const pagesize = this.isMobile ? 'page' : 'auto';

    const size: TuiDialogSize | undefined =
      pagesize === 'auto' || pagesize === 'page' ? pagesize : undefined;

    this.dialogService
      .open<any>(
        new PolymorpheusComponent(ReviewModalComponent, this.injector),
        {
          data: {
            skuName: skuName,
            sku: sku,
            taskID: taskID,
            available: available,
            menId: menId,
            femaleId: femaleId,
            sized: sized
          },
          dismissible: true,
          size: size
        }
      )
      .subscribe(
        (r) => {
          if (r) {
            const options: any = { status: 'success' };
            this.alertService.open('Отзыв создан', options);
            this.getData(1);
          }
        },
        (e: unknown) => {
          const options: any = { status: 'error' };
          this.alertService.open(
            'Произошли ошибки при создании отзыва! Повторите попытку позднее!',
            options
          );
        }
      );
  }

  goToPage(event: number) {
    this.index = event;
    this.getData(event + 1);
  }

  getID(data: any): number {
    const { taskList } = data;
    if (taskList && taskList.length > 0) {
      return taskList[0].ID;
    }
    return -1;
  }
}
