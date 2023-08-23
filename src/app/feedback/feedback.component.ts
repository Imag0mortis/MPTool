import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  filter,
  map,
  of,
  switchMap,
  tap
} from 'rxjs';
import { RequestService } from '../shared/services/request.service';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification
} from '@taiga-ui/core';
import { WbFeedbackService } from '../shared/services/wb-feedback.service';
import { AppService } from '../shared/services/app.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { GuideModalService } from './guidemodal/guidemodal.service';
import { GuidemodalComponent } from './guidemodal/guidemodal.component';

interface WbApiKey {
  company_name: string;
  lk_id: number;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  tableFilterReady = false;
  accounts: WbApiKey[] = [];

  data$: BehaviorSubject<any> = new BehaviorSubject(null);
  page$: BehaviorSubject<any> = new BehaviorSubject(1);
  total$: BehaviorSubject<any> = new BehaviorSubject(null);

  modalSubscription: Subscription = new Subscription();

  constructor(
    private request: RequestService,
    private feedbackService: WbFeedbackService,
    private readonly alertService: TuiAlertService,
    private appService: AppService,
    private modalService: GuideModalService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  showDialog(): void {
    this.modalSubscription = this.dialogService
      .open(new PolymorpheusComponent(GuidemodalComponent, this.injector), {
        size: 'l',
        closeable: false,
        dismissible: false
      })
      .subscribe();
  }

  onPageChanges(page: number) {
    this.page$.next(page + 1);
    const selectedAccount = this.feedbackService.currentCompanyID.value;
    this.refreshData(selectedAccount as any, page + 1);
  }

  private loadInitialData() {
    this.request
      .getFeedbacksWbApiKeys()
      .pipe(
        switchMap((keys) => {
          if (keys.length == 0) {
            this.showDialog();
            return of(keys);
          }
          this.accounts = keys.map((v: any) => ({
            company_name: v.companyName,
            lk_id: v.lkID
          }));
          this.tableFilterReady = true;

          return this.request
            .getFeedbacks(this.accounts[0].lk_id, 1, 50)
            .pipe(map((response: any) => this.filterFeedbacks(response)));
        })
      )
      .subscribe((v: any) => {
        if (v && v.data && v.data.countUnanswered) {
          this.total$.next(v.data.countUnanswered / 5);
        }
        if (v && v.data && v.data.feedbacks) {
          this.data$.next(v.data.feedbacks);
        }
      });
  }

  private filterFeedbacks(response: any) {
    const filteredFeedbacks = response.data.feedbacks.filter(
      (feedback: any) => feedback.text != ''
    );
    return {
      ...response,
      data: { ...response.data, feedbacks: filteredFeedbacks }
    };
  }

  filtersChange(currentCompanyID: any) {
    this.feedbackService.currentCompanyID.next(currentCompanyID.account);
    this.refreshData(currentCompanyID.account, this.page$.value);
  }

  private refreshData(selectedAccount: number, page: number) {
    this.request
      .getFeedbacks(selectedAccount, page, 50)
      .pipe(map((response: any) => this.filterFeedbacks(response)))
      .subscribe({
        next: (v) => {
          this.data$.next(v.data.feedbacks);
        },
        error: (e) => {
          console.log(e);
          this.alertService
            .open('Произошла ошибка в загрузке данных', {
              label: 'Ошибка!',
              status: 'error' as TuiNotification
            })
            .subscribe();
          this.data$.next([]);
        }
      });
  }

  ngOnDestroy(): void {
    this.page$.complete();
    this.data$.complete();
    this.total$.complete();
    if (this.modalService.modalClosed) {
      this.modalSubscription.unsubscribe();
    }
  }
}
