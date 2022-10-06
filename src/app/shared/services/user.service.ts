import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userSubj$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private request: RequestService
  ) { }

  set setUserSubj(arg: any) {
    this.userSubj$.next(arg);
  }

  initUsersData() {
    this.request.getUserInfo().subscribe(
      r => {
        console.log(r)
        this.setUserSubj = r;
      }
    )
  }
}
