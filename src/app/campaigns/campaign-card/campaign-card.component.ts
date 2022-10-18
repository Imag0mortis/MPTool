import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {

  firstForm: FormGroup;

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

  mockData = [
    {
      product: 'Плакат Арии',
      views: 12344,
      users: 3252,
      viewsByOne: 120,
      clicks: 425,
      clickPer: 20,
      byClick: 23,
      inBin: 20,
      orders: 500,
      sum: 45354354,
      conversion: 365
    },
  ] as const;

  columns = Object.keys(this.mockData[0]);

  ngOnInit(): void {
    this.route.params.pipe(first(), switchMap(
      params => this.request.getCampaign(params['id'], false)
    )).subscribe((result: any) => {
      // тут явно другое поле и возможно их несколько, надо уточнять
      this.firstForm.get('account')?.reset(result.campaignName)
      this.firstForm.get('id')?.reset(result.campaignID)
      this.firstForm.get('budget')?.reset(result.budget)
      this.firstForm.get('category')?.reset(result.type)

      this.data = result
    });
  }

  onnOff: boolean = true;

  readonly testForm2 = new FormGroup({
    place: new FormControl(`112`),
    bid: new FormControl(`230`),
  });

  save() {
    this.request.saveCampaign({
      "campaign_id": this.firstForm.get('id')!.value,
      "enable": this.data.isEnabled,
      "use_optimizer": this.data.isUseOptimizer,
      "dynamic_keyword": false,
      "keyword": null,
      "target_bid": this.data.allTargetBids
    }).subscribe(
      r => this.router.navigate(['']),
      e => alert('ошибка сохранения')
    );
  }
}
