import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WbFeedbackService {
  currentCompanyID = new BehaviorSubject(null);
}
