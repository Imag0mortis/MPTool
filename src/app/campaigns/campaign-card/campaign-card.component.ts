import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { concat, first, of, Subscription, switchMap, take } from 'rxjs';
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
  providers: [tuiItemsHandlersProvider({stringify: STRINGIFY_KEYWORD})],
})
export class CampaignCardComponent implements OnInit, OnDestroy {

  firstForm: FormGroup;
  subscription: Subscription = new Subscription;
  innerSubs: Subscription = new Subscription;
  listBids: any;
  keywordValue: any = new FormControl(null);
  keywordBids: any[] = [];
  bidLog: any[] = [];

  campaignStats: any;

  constructor(
    public appService: AppService,
    private request: RequestService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.firstForm = fb.group({
      account: new FormControl(``),
      id: new FormControl(0),
      budget: new FormControl(0),
      category: new FormControl(``),
      delivery: new FormControl(``),
    })
  }

  validator(num: number) {
    return Validators.min(num)
  }

  data: any = undefined;
  loading: boolean = true;
  dynamicKeyword: boolean = false;
  columns = ['SKUName', 'viewCount', 'users', 'viewsByUser', 'clicks', 'clickPercent', 'costPerClick', 'addedToBasket', 'adCampainCost', 'orders', 'conversionRate']

  ngOnInit(): void {

    this.subscription = this.route.params.pipe(first(), switchMap(
      params => {
        return concat(
          this.request.getCampaign(params['id'], false),
          this.request.getCampaign(params['id'], true)
        )
      }
    ), take(2)).subscribe(
      (result: any) => {
        // тут явно другое поле и возможно их несколько, надо уточнять
        this.firstForm.get('account')?.reset(result.campaignName)
        this.firstForm.get('id')?.reset(result.campaignID)
        this.firstForm.get('budget')?.reset(result.budget)
        this.firstForm.get('category')?.reset(result.type)
        this.firstForm.get('account')?.disable()
        this.firstForm.get('id')?.disable()
        this.firstForm.get('budget')?.disable()
        this.firstForm.get('category')?.disable()
        if(result.allKeywords) this.keywordValue.setValue(result.allKeywords[0]);
        this.data = result;
        if (result.allTargetBids && result.listBids) {
          this.listBids = result.allTargetBids.map((el: any) => {
            let extendetEL = el;
            el['minCPM'] = result.listBids.find((elem: any) => elem.targetID === el.targetID).minCPM;
            return extendetEL
          });
        }

        console.log(result)

        this.dynamicKeyword = result.isUseDynamicKeyword
        if(this.dynamicKeyword) {
          this.keywordValue.setValue(this.data.allKeywords[0]);
          this.keywordValue.disable(true);
        }

        this.bidLog = result.bidLog;

        if(this.data.type === "Поиск") {
          this.innerSubs = this.keywordValue.valueChanges.pipe(switchMap(
            (changes: Keywords) => {
              if(changes) return this.request.getRealBids(changes.keyword)
              else return of({bid: []})
            }
          )).subscribe((value: any) => {
            this.keywordBids = value.bid
          });
        }

        result.campaignStats ? this.campaignStats = result.campaignStats : null;
      },
      error => console.error('ошибка!'),
      () => this.loading = false
    );
  }

  validateForNulls(): boolean {
    if (this.listBids.find((element: any) =>
      element.targetBid === 0 || element.targetPlace === 0)) {
      return false;
    }
    else return true;
  }

  validateMinCPM(): boolean {
    if (this.listBids.find((element: any) =>
      element.targetBid < element.minCPM)) {
      return false;
    }
    else return true;
  }

  save() {
    if (this.validateForNulls()) {
      if (this.validateMinCPM()) {
        this.request.saveCampaign({
          "campaign_id": this.firstForm.get('id')!.value,
          "enable": this.data.isEnabled,
          "use_optimizer": this.data.useOptimazer ? this.data.useOptimazer : false,
          "dynamic_keyword": this.dynamicKeyword,
          "keyword": this.keywordValue.value.keyword,
          "target_bid": this.listBids.map((el: any) => {
            let newEl: any = {};
            newEl['targetBid'] = el.targetBid
            newEl['targetPlace'] = el.targetPlace
            newEl['targetID'] = el.targetID
            newEl['minPlace'] = el.minPlace
            return newEl
          })
        }).subscribe(
          r => this.appService.goCampaigns(),
          e => alert('ошибка сохранения')
        );
      }
      else alert('Целевая ставка не может быть ниже минимальной ставки!')
    }
    else alert('Целевая ставка или позиция не может быть равно 0!')
  }

  dynamicKeywordToggle() {
    this.dynamicKeyword = !this.dynamicKeyword;
    if(this.dynamicKeyword) {
      this.keywordValue.setValue(this.data.allKeywords[0]);
      this.keywordValue.disable(true);
    }
    else {
      this.keywordValue.enable(true)
    }
  }

  applyNewKeyword(event: any) {
    let newValue = {
      keyword: event.target.value,
      count: 0
    }
    this.data.allKeywords.push(newValue);
    this.keywordValue.setValue(newValue);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.innerSubs.unsubscribe();
  }
}
