import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  public tableData$: BehaviorSubject<any> = new BehaviorSubject([]);
  public page$: BehaviorSubject<any> = new BehaviorSubject(0);
  public total$: BehaviorSubject<any> = new BehaviorSubject(0);
}
