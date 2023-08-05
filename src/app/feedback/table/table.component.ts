import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Inject,
  Injector
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CampaingsTableObjSave } from 'src/app/shared/interfaces';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';

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

  text = '';

  subscription: Subscription = new Subscription();

  columns = ['product', 'review', 'autoAnswer', 'status'];

  constructor(
    public appService: AppService,
    private user: UserService,
    private request: RequestService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {
    setTimeout(() => {
      this.text = 'Говно а не продукт, больше не буду заказывать';
      this.request
        .getAnswerFromAI({
          feedback: this.text,
          feedbackId: 'eBNBxYkBUYwa0QEf5UIL'
        })
        .subscribe((v) => console.log(v));
    }, 5000);
  }

  goToPage(page: number): void {
    this.onPageChanges.emit(page);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get getPagesLength() {
    return Math.ceil(this.total / 10);
  }

  getStarArray(valuation: number): number[] {
    return Array(valuation).fill(0);
  }
}
