import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Injector,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  BehaviorSubject,
  concatAll,
  filter,
  first,
  map,
  of,
  Subscription,
  switchMap,
  tap,
  toArray
} from 'rxjs';
import { RequestService } from '../shared/services/request.service';
import { UserService } from '../shared/services/user.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import {
  TuiContextWithImplicit,
  TuiStringHandler,
  tuiPure
} from '@taiga-ui/cdk';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FeedbackWbApiKey } from '../shared/interfaces';

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
  statuses = ['Ожидает ответа', 'Опубликован'];
  accounts: WbApiKey[] = [];

  data$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private request: RequestService) {}

  ngOnInit(): void {
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
        map((response: any) => {
          const filteredFeedbacks = response.data.feedbacks.filter(
            (feedback: any) => feedback.text != ''
          );
          return {
            ...response,
            data: { ...response.data, feedbacks: filteredFeedbacks }
          };
        })
      )
      .subscribe((v: any) => {
        console.log(v);
        this.data$.next(v.data.feedbacks);
      });
  }
}
