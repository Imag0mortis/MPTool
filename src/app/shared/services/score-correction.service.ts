import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreCorrectionService {
  scoreCorrectionData$: BehaviorSubject<any> = new BehaviorSubject(null);
}
