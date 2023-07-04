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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler
} from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import {
  PolymorpheusContent,
  PolymorpheusComponent
} from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { GuidemodalComponent } from '../guidemodal/guidemodal.component';
import { GuideModalService } from '../guidemodal/guidemodal.service';

interface Python {
  readonly lk_id: string;
  readonly company_name: string;
}

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss']
})
export class TableFiltersComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  subscriptionModal: Subscription;

  @Output() filtersChange = new EventEmitter<{
    account: string;
    status: string;
    type: string;
  }>();

  @Input() types: string[] = [];
  @Input() statuses: string[] = [];
  @Input() accounts: any[] = [];

  template: PolymorpheusContent<TuiDialogContext<void, undefined>>;

  @tuiPure
  stringify(
    items: readonly Python[]
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(
        ({ lk_id, company_name }) => [lk_id, company_name] as [string, string]
      )
    );
    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
  }

  filtersBind: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly dialogs: TuiDialogService,
    private modalService: GuideModalService
  ) {}

  ngOnInit(): void {
    this.filtersBind = this.fb.group({
      account: new FormControl(
        this.accounts.length > 0 ? this.accounts[0].lk_id : null
      ),
      type: new FormControl(this.types.length > 0 ? this.types[0] : null),
      status: new FormControl(
        this.statuses.length > 0 ? this.statuses[0] : null
      )
    });

    if (this.accounts.length === 0) {
      this.showDialog();
    }
    this.subscription = this.filtersBind.valueChanges.subscribe((changes) => {
      this.filtersChange.emit({
        account: this.filtersBind.get('account')?.value,
        status: this.filtersBind.get('status')?.value,
        type: this.filtersBind.get('type')?.value
      });
    });
  }

  showDialog(): void {
    this.subscriptionModal = this.dialogService
      .open(new PolymorpheusComponent(GuidemodalComponent, this.injector), {
        size: 'l',
        closeable: false,
        dismissible: false
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.modalService.modalClosed) {
      this.subscriptionModal.unsubscribe();
    }
  }
}
