import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, first, Subscription, switchMap, take } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit, OnDestroy {

  firstForm: FormGroup;
  subscription: Subscription = new Subscription;
  allBids: any[] = [];
  listBids: any;

  campaignStats: any;

  constructor(
    public appService: AppService,
    private request: RequestService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.firstForm = fb.group({
      account: new FormControl(``),
      id: new FormControl(0),
      budget: new FormControl(0),
      category: new FormControl(``),
      delivery: new FormControl(``),
    })
  }

  data: any = undefined;
  loading: boolean = true;

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

        this.data = result
        this.allBids = result.allBids;
        this.listBids = result.listBids.map((el: any) => {
          let extendetEL = el;
          el['useOptimazer'] = false;
          return extendetEL
        });
        result.campaignStats ? this.campaignStats = result.campaignStats : null;
      },
      error => console.error('ошибка!'),
      () => this.loading = false
    );
  }

  onnOff: boolean = true;

  validate(): boolean {
    let result: boolean = true;
    this.listBids.forEach((element: any) => {
      if(element.currentBid === 0 || element.currentPlace === 0) result = false;
      else result = true;
    });
    return result;
  }

  save() {
    if(this.validate()) {
      this.request.saveCampaign({
        "campaign_id": this.firstForm.get('id')!.value,
        "enable": this.data.isEnabled,
        "use_optimizer": false,
        "dynamic_keyword": false,
        "keyword": null,
        "target_bid": this.listBids.map((el: any) => {
          let newEl: any = {};
          newEl['targetBid'] = el.currentBid
          newEl['targetPlace'] = el.currentPlace
          newEl['targetID'] = el.targetID
          return newEl
        })
      }).subscribe(
        r => this.appService.goCampaigns(),
        e => alert('ошибка сохранения')
      );
    }
    else alert('Целевая ставка или позиция не может быть равно 0!')
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
