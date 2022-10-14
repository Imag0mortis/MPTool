import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AdsService } from './ads.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  accounts$ = new BehaviorSubject<any>([{lk_id: '', company_name: ''}]);
  statuses$ = new BehaviorSubject<any>(["Все"]);
  types$ = new BehaviorSubject<any>(["Все"]);

  constructor(
    private router: Router
  ) { }

  public updateTable(account: any, type: string, status: string) {
    this.router.navigate(['/campaigns'], {
      queryParams: {
        lk: account,
        page: 1,
        pagesize: 10,
        type: type === "Все" ? null : type,
        state: status === "Все" ? null : status
      },
      queryParamsHandling: 'merge',
    });
  }
}
