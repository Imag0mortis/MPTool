import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RansomCalculationService {

  rancomCalculationData$: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() { }
}
