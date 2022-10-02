import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {

  constructor(
    public appService: AppService
  ) { }

  data = [
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

  columns = Object.keys(this.data[0]);

  ngOnInit(): void {
    console.log(this.data)
  }

  onnOff: boolean = true;

  readonly testForm = new FormGroup({
    account: new FormControl(`Эмеральд`),
    id: new FormControl(458432),
    budget: new FormControl(30000),
    category: new FormControl(`плакаты`),
    delivery: new FormControl(`24 часа`),
  });

  readonly testForm2 = new FormGroup({
    place: new FormControl(`112`),
    bid: new FormControl(`230`),
  });

  
 


}
