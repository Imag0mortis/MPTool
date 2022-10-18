import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealBidService {

  realBidData$: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() { }
}