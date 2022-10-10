import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FiltersService } from './filters.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userSubj$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private request: RequestService,
    private router: Router,
    private filter: FiltersService
  ) { }

  set setUserSubj(arg: any) {
    this.userSubj$.next(arg);
  }

  initUsersData() {
    this.request.getUserInfo().subscribe(
      (r: any) => {
        this.filter.accounts$.next(r.user_wb_companies)
        this.setUserSubj = r;
      },
      e => {
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
      }
    )
  }
}
