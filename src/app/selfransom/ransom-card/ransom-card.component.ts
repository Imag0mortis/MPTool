import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';
import { PaymentQRState, RansomTask } from './card-table/card-table.component';

@Component({
  selector: 'app-ransom-card',
  templateUrl: './ransom-card.component.html',
  styleUrls: ['./ransom-card.component.scss']
})
export class RansomCardComponent implements OnInit {
  subscription: Subscription = new Subscription();
  data: RansomTask[] = [];
  filter = 'все';

  constructor(private route: ActivatedRoute, private request: RequestService) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        switchMap((param: any) => {
          return this.request.getSelfransomTask(Number(param.id));
        })
      )
      .subscribe((r: any) => {
        this.data = r.tasks;
        this.data.forEach(
          (el) => (el['paymentState'] = PaymentQRState.initial)
        );
      });
  }

  getFilteredData(arg: string[]) {
    const filterSet = new Set(arg);
    return this.data.filter((el) => filterSet.has(el.deliveryState));
  }

  onTabClick(filter: string) {
    this.filter = filter;
  }

  test() {
    console.log(this.data);
  }
}
