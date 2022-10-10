import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  accounts$ = new BehaviorSubject<any>([{lk_id: '', company_name: ''}]);
  statuses$ = new BehaviorSubject<any>(["Все"]);
  types$ = new BehaviorSubject<any>(["Все"]);

  constructor() { }
}
