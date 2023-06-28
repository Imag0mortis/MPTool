import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { concat, first, of, Subscription, switchMap, take } from 'rxjs';
import { TargetBid } from 'src/app/shared/interfaces';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';

interface Keywords {
  count: number;
  keyword: string;
}

const STRINGIFY_KEYWORD: TuiStringHandler<Keywords> = (item: Keywords) =>
  `${item.keyword} (${item.count})`;

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
  providers: [tuiItemsHandlersProvider({ stringify: STRINGIFY_KEYWORD })]
})
export class CampaignCardComponent implements OnInit, OnDestroy {
  firstForm: FormGroup;
  subscription: Subscription = new Subscription();
  innerSubs: Subscription = new Subscription();
  listBids: any[] = [
    {
      targetPlace: 50
    }
  ];
  keywordValue: '';
  keywordBids: any[] = [];
  bidLog: any[] = [];

  campaignStats: any;

  data: any = undefined;
  loading = true;
  dynamicKeyword = false;
  isEnabled = false;
  useOptimazer = false;

  toggleCampaignFT = false;
  toggleRealBidsFT = false;
  toggleDynamicKeywordFT = false;

  isTextareaDisabled = false;

  constructor(
    public appService: AppService,
    private request: RequestService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.firstForm = fb.group({
      account: new FormControl(''),
      id: new FormControl(0),
      budget: new FormControl(0),
      category: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        first(),
        switchMap((params) => {
          return concat(this.request.getCampaign(params['id']));
        }),
        take(1)
      )
      .subscribe({
        next: (result: any) => {
          this.firstForm.get('account')?.reset(result.campaignName);
          this.firstForm.get('id')?.reset(result.campaignID);
          this.firstForm.get('budget')?.reset(result.budget);
          this.firstForm.get('category')?.reset(result.type);
          this.firstForm.get('account')?.disable();
          this.firstForm.get('id')?.disable();
          this.firstForm.get('budget')?.disable();
          this.firstForm.get('category')?.disable();
          if (result.allKeywords) {
            this.keywordValue = result.allKeywords;
          }
          this.data = result;
          this.listBids = result.listBids;
          this.keywordValue = result.isUseOptimizer ? result.bidKeyWord : '';
          this.toggleDynamicKeywordFT
            ? null
            : (this.dynamicKeyword = result.isUseDynamicKeyword);
          this.toggleCampaignFT ? null : (this.isEnabled = result.isEnabled);
          this.toggleRealBidsFT
            ? null
            : (this.useOptimazer = result.isUseOptimizer);
          if (this.dynamicKeyword) {
            this.keywordValue = this.data.allKeywords[0];
            this.isTextareaDisabled = true;
          }
          this.bidLog = result.bidLog;
          if (this.data.type === 'Поиск') {
            this.innerSubs = of(this.keywordValue)
              .pipe(
                switchMap((changes: string) => {
                  if (changes) {
                    const trimmedKeywordValue = changes
                      .trim()
                      .replace(/\s+/g, ' ');
                    return this.request.getRealBids(trimmedKeywordValue);
                  } else {
                    return of({ bid: [] });
                  }
                })
              )
              // eslint-disable-next-line rxjs/no-nested-subscribe
              .subscribe((value: any) => {
                this.keywordBids = value.bidLog;
              });
          }
          result.campaignStats
            ? (this.campaignStats = result.campaignStats)
            : null;
        },
        error: (error) => console.error('ошибка!'),
        complete: () => (this.loading = false)
      });
  }

  isRequiredFieldsFilled(): boolean {
    const targetPlace = this.listBids[0].targetPlace;
    const targetBid = this.listBids[0].targetBid;
    const minPlace = this.listBids[0].min_place;

    return !!targetPlace && !!targetBid && !!minPlace;
  }

  searchCompetitorsBids(): void {
    if (!this.keywordValue || typeof this.keywordValue !== 'string') {
      alert('Некорректное значение ключевого слова');
      return;
    }

    const trimmedKeywordValue = (this.keywordValue as string)
      .trim()
      .replace(/\s+/g, ' ');

    this.request.getRealBids(trimmedKeywordValue).subscribe({
      next: (res) => {
        if (
          (res as any).bid === null ||
          !Array.isArray((res as any).bid) ||
          (res as any).bid.length === 0
        ) {
          alert('Нет подходящих результатов');
        }
        this.keywordBids = (res as any).bid;
      },
      error: (error) => {
        alert(error + ' произошла ошибка');
      }
    });
  }

  validator(num: number) {
    return Validators.min(num);
  }

  validateForNulls(): boolean {
    return !this.listBids.find(
      (element: any) => element.targetBid === 0 || element.targetPlace === 0
    );
  }

  validateMinCPM(): boolean {
    return !this.listBids.find(
      (element: any) => element.targetBid < element.minCPM
    );
  }

  toggleCampaign() {
    this.toggleCampaignFT ? null : (this.toggleCampaignFT = true);
    this.isEnabled = !this.isEnabled;
  }

  toggleRealBids() {
    this.toggleRealBidsFT ? null : (this.toggleRealBidsFT = true);
    this.useOptimazer = !this.useOptimazer;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  save() {
    if (this.validateForNulls()) {
      if (this.validateMinCPM()) {
        if (this.data.type === 'Поиск') {
          this.request
            .saveCampaign({
              campaign_id: this.firstForm.get('id')!.value,
              enable: this.isEnabled ? this.isEnabled : false,
              use_optimizer: this.useOptimazer ? this.useOptimazer : false,
              keyword: this.keywordValue ? this.keywordValue : '',
              target_bid: this.listBids.map((el: any, i) => {
                const newEl: any = {};
                console.log(this.listBids);
                newEl['targetBid'] = Number(el.targetBid)
                  ? Number(el.targetBid)
                  : el.currentBid;
                newEl['targetPlace'] = Number(el.targetPlace)
                  ? Number(el.targetPlace)
                  : el.currentPlace;
                newEl['min_place'] = Number(el.min_place)
                  ? Number(el.min_place)
                  : 0;
                newEl['targetID'] = Number(el.targetID);
                console.log(el);
                return newEl;
              })
            })
            .subscribe({
              next: () => {
                this.appService.goCampaigns();
              },
              error: (error) => {
                console.log(error);
                alert('ошибка сохранения');
              }
            });
        } else {
          {
            this.request
              .saveCampaign({
                campaign_id: this.firstForm.get('id')!.value,
                enable: this.isEnabled ? this.isEnabled : false,
                use_optimizer: this.useOptimazer ? this.useOptimazer : false,
                keyword: this.keywordValue ? this.keywordValue : '',
                target_bid: this.listBids.map((el: any) => {
                  console.log(el);
                  const newEl: any = {};
                  newEl['targetBid'] = Number(el.targetBid)
                    ? Number(el.targetBid)
                    : el.currentBid;
                  newEl['targetPlace'] = Number(el.targetPlace)
                    ? Number(el.targetPlace)
                    : el.currentPlace;
                  newEl['min_place'] = Number(el.min_place)
                    ? Number(el.min_place)
                    : 0;
                  newEl['targetID'] = Number(el.targetID);
                  return newEl;
                })
              })
              .subscribe({
                next: () => {
                  this.appService.goCampaigns();
                },
                error: (error) => {
                  alert('ошибка сохранения');
                }
              });
          }
        }
      } else {
        alert('Целевая ставка не может быть ниже минимальной ставки!');
      }
    } else {
      alert('Целевая ставка или позиция не может быть равно 0!');
    }
  }

  dynamicKeywordToggle() {
    this.toggleDynamicKeywordFT ? null : (this.toggleDynamicKeywordFT = true);
    this.dynamicKeyword = !this.dynamicKeyword;
    if (this.dynamicKeyword) {
      this.keywordValue = this.data.allKeywords[0];
      this.isTextareaDisabled = true;
    } else {
      this.isTextareaDisabled = true;
    }
  }

  applyNewKeyword(event: any) {
    const newValue = {
      keyword: event.target.value,
      count: 0
    };
    this.data.allKeywords.push(newValue);
    this.keywordValue = newValue.keyword;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.innerSubs.unsubscribe();
  }
}
