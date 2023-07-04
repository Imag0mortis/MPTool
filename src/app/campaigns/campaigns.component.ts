import { Component, Inject, OnDestroy, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, first, of, Subscription, switchMap } from 'rxjs';
import { RequestService } from '../shared/services/request.service';
import { UserService } from '../shared/services/user.service';
import { VideoModalComponent } from '../selfransom/main-ransom/video-modal/video-modal.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();

  routeSub: Subscription = new Subscription();

  data$: BehaviorSubject<any> = new BehaviorSubject(null);
  page$: BehaviorSubject<any> = new BehaviorSubject(1);
  total$: BehaviorSubject<any> = new BehaviorSubject(null);

  accounts = [];
  statuses = ['Все'];
  types = ['Все'];
  choosenAccount: any;
  ready = false;

  constructor(
    private user: UserService,
    private request: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.data$ = new BehaviorSubject(null);
    this.page$ = new BehaviorSubject(1);
    this.total$ = new BehaviorSubject(null);

    this.user.userSubj$
      .pipe(
        switchMap((res) => {
          if (res) {
            this.accounts = res.user_wb_companies;
            this.choosenAccount = res.user_wb_companies[0]['lk_id'];
            return this.request.getAds(
              this.choosenAccount,
              1,
              10,
              'все',
              'все'
            );
          } else {
            return of(null);
          }
        })
      )
      .subscribe((result: any) => {
        if (result) {
          this.data$.next(result.adsData);
          this.total$.next(result.tableData.campaignsTotal);
          this.statuses = ['Все'].concat(result.stateList);
          this.types = ['Все'].concat(result.typeList);
          this.ready = true;

          this.routerSubscriptionInit();
        }
      });
  }

  routerSubscriptionInit() {
    this.routeSub = this.route.queryParams.subscribe((params: Params) => {
      params['page'] ? this.page$.next(Number(params['page'])) : null;
      this.getData(params);
    });
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

  ngOnDestroy(): void {
    this.page$.complete();
    this.data$.complete();
    this.total$.complete();
    this.subs.unsubscribe();
    this.routeSub.unsubscribe();
  }

  filtersChange(arg: any) {
    this.choosenAccount = arg.account;
    this.updateTable(arg.account, arg.type, arg.status);
  }

  getData(params: Params) {
    this.request
      .getAds(
        this.choosenAccount,
        params['page'],
        10,
        params['state'],
        params['type']
      )
      .pipe(first())
      .subscribe(
        (result: any) => {
          this.data$.next(result.adsData);
          this.total$.next(result.tableData.campaignsTotal);
        },
        (error: unknown) => console.log(error)
      );
  }

  accountsChanges() {
    this.page$.next(1);
  }

  onPageChanges(page: number) {
    this.page$.next(page + 1);
    this.router.navigate(['/campaigns'], {
      queryParams: {
        page: page + 1
      },
      queryParamsHandling: 'merge'
    });
  }

  public updateTable(account: any, type: string, status: string) {
    this.router.navigate(['/campaigns'], {
      queryParams: {
        lk: account,
        page: 1,
        pagesize: 10,
        type: type === 'Все' ? null : type,
        state: status === 'Все' ? null : status
      },
      queryParamsHandling: 'merge'
    });
  }
}
