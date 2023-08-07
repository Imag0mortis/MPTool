import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { RequestService } from '../shared/services/request.service';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { WbFeedbackService } from '../shared/services/wb-feedback.service';

interface WbApiKey {
  company_name: string;
  lk_id: number;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  tableFilterReady = false;
  accounts: WbApiKey[] = [];

  data$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private request: RequestService,
    private feedbackService: WbFeedbackService,
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.request
      .getFeedbacksWbApiKeys()
      .pipe(
        tap((keys) => {
          this.accounts = keys.map((v: any) => ({
            company_name: v.companyName,
            lk_id: v.lkID
          }));
          this.tableFilterReady = true;
        }),
        switchMap(() =>
          this.request.getFeedbacks(this.accounts[0].lk_id, 1, -1)
        ),
        map((response: any) => this.filterFeedbacks(response))
      )
      .subscribe((v: any) => {
        this.data$.next(v.data.feedbacks);
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
    this.refreshData(currentCompanyID.account);
  }

  private refreshData(selectedAccount: number) {
    this.request
      .getFeedbacks(selectedAccount, 1, -1)
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
}
