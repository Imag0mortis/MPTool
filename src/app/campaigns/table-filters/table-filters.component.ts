import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler
} from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';

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

  @Output() filtersChange = new EventEmitter<{
    account: string;
    status: string;
    type: string;
  }>();

  @Input() types: string[] = [];
  @Input() statuses: string[] = [];
  @Input() accounts: any[] = [];

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtersBind = this.fb.group({
      account: new FormControl(this.accounts[0].lk_id),
      type: new FormControl(this.types[0]),
      status: new FormControl(this.statuses[0])
    });

    this.subscription = this.filtersBind.valueChanges.subscribe((changes) => {
      this.filtersChange.emit({
        account: this.filtersBind.get('account')?.value,
        status: this.filtersBind.get('status')?.value,
        type: this.filtersBind.get('type')?.value
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
