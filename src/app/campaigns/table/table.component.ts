import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CampaingsTableObjSave } from 'src/app/shared/interfaces';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnDestroy {
  @Input() data: any[] = [];
  @Input() total = 0;
  @Input() page = 0;

  @Output() onPageChanges = new EventEmitter();
  @Output() onSizeChanges = new EventEmitter();
  constructor(
    public appService: AppService,
    private user: UserService,
    private request: RequestService
  ) {}

  subscription: Subscription = new Subscription();

  columns = [
    'banner',
    'name',
    'type',
    'target',
    'bid',
    'budget',
    'status',
    'action',
    'onOffToogle'
  ];
  //search = ``;

  goToPage(page: number): void {
    this.onPageChanges.emit(page);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get getPagesLength() {
    return Math.ceil(this.total / 10);
  }

  toggleCampaign(
    id: number,
    isEnabled: boolean,
    targetBid: number,
    targetPlace: number
  ) {
    if (targetBid > 0 && targetPlace > 0) {
      const body: CampaingsTableObjSave = {
        campaign_id: id,
        enable: isEnabled
      };
      this.request.saveCampaign(body).subscribe((r) => null);
    } else {
      alert('Целевая ставка или позиция не может быть равно 0!');
    }
  }

  public syncAdd() {
    this.subscription = this.request
      .syncAds(this.user.userSubj$.value.user_wb_companies[0].lk_id)
      .subscribe((r) => alert('Кампании обновятся в течении минимум 5 минут'));
  }
}
