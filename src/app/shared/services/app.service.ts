import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public menuOpened: boolean = true;
  public menuSelector: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private router: Router,
    private user: UserService
  ) { }

  init() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.menuSelector.next(e.url.split('?')[0].substring(1));
      }
    });
  }

  menuToogle() {
    this.menuOpened = !this.menuOpened;
  }

  goCampaigns() {
    this.router.navigate(['/campaigns'], {
      queryParams: {
        page: 1,
        pagesize: 10,
        lk: this.user.userSubj$.value['user_wb_companies'][0]['lk_id']
      },
      queryParamsHandling: 'merge',
    });
  }

  goRealPrice() {
    this.router.navigate(['/realprice']);
  }
  
  goPosition() {
    this.router.navigate(['/position']);
  }

  goRansomCalculation() {
    this.router.navigate(['/ransom_calculation']);
  }

  goScoreCorretion() {
    this.router.navigate(['/score_correction']);
  }

  goCampaign(id: number) {
    this.router.navigate([`/campaigns/${id}`]);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }

  goLiker() {
    this.router.navigate(['/liker'])
  }

}
