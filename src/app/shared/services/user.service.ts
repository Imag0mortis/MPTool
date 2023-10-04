import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, first, switchMap, tap } from 'rxjs';
import { RequestService } from './request.service';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSubj$: BehaviorSubject<any> = new BehaviorSubject(null);
  tariffInfo: any[] = [];
  isOwner = new BehaviorSubject(false);
  givedSalary = new Subject();

  constructor(
    private request: RequestService,
    private router: Router,
    private alertService: TuiAlertService
  ) {}

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
        if (r.user_name === 'ggg@gmail.com') {
          this.isOwner.next(true);
          this.givedSalary.subscribe((r) => {
            if (r == false) {
              setInterval(() => {
                this.alertService.open('Скинь зп').subscribe();
              }, 3500);
            }
          });
          if (r.self_info.company_position == '0') this.givedSalary.next(false);
          if (r.self_info.company_position == '1') this.givedSalary.next(true);
        }
        localStorage.setItem('usetifulID', r.user_id);
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
