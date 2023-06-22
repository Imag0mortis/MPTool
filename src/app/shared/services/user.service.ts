import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSubj$: BehaviorSubject<any> = new BehaviorSubject(null);
  tariffInfo: any[] = [];

  constructor(private request: RequestService, private router: Router) {}

  set setUserSubj(arg: any) {
    this.userSubj$.next(arg);
  }

  initUsersData() {
    this.updateUserInfo();
    this.request
      .getTarifInfo()
      .pipe(first())
      .subscribe((r: any) => {
        this.tariffInfo = r;
      });
  }

  updateUserInfo() {
    this.request.getUserInfo().subscribe(
      (r: any) => {
        if (localStorage.getItem('token')) {
          this.setUserSubj = r;
        }
        this.setUserSubj = r;
      },
      (e: unknown) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
  }
}
