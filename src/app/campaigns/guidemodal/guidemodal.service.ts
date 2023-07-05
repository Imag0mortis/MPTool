import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideModalService {
  modalClosed: Subject<boolean> = new Subject<boolean>();

  constructor() {}
}
