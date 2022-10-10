import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TuiContextWithImplicit, TuiIdentityMatcher, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { delay, of, Subscription } from 'rxjs';
import { FiltersService } from 'src/app/shared/services/filters.service';


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

  subscriptions: Subscription[] = [];

  @tuiPure
  stringify(
    items: readonly Python[],
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(items.map(({ lk_id, company_name }) => [lk_id, company_name] as [string, string]));
    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || ``;
  }

  filtersBind: FormGroup;
  loading: boolean = false;

  constructor(
    public filters: FiltersService,
    private fb: FormBuilder
  ) {
    this.filtersBind = fb.group({
      account: new FormControl(this.filters.accounts$.value[0].lk_id),
      type: new FormControl(this.filters.types$.value[0]),
      status: new FormControl(this.filters.types$.value[0]),
    })
  }

  ngOnInit(): void {

    this.subscriptions[0] = this.filters.accounts$.subscribe(
      r => {
        if (this.filtersBind.get('account')?.value === '') {
          this.filtersBind.get('account')?.reset(r[0].lk_id);
        }
      }
    )
    this.subscriptions[1] = this.filtersBind.valueChanges.subscribe(
      changes => {
        this.filters.updateTable(
          this.filtersBind.get('account')?.value,
          this.filtersBind.get('type')?.value,
          this.filtersBind.get('status')?.value,
        )
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
