import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public menuOpened = true;
  public menuSelector: BehaviorSubject<string> = new BehaviorSubject('');
  isMenuOpen: boolean;

  constructor(private router: Router, private user: UserService) {}

  get isMobile() {
    let isMobile: boolean;
    document.body.clientWidth > 768 ? (isMobile = false) : (isMobile = true);
    return isMobile;
  }

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
    this.router.navigateByUrl('/campaigns');
  }

  goRealPrice() {
    this.router.navigate(['/realprice']);
  }

  goAccount() {
    this.router.navigate(['/account']);
  }

  goSelfRansom() {
    this.router.navigate(['/selfransom']);
  }

  goSelfRansomCard(id: number) {
    this.router.navigate(['/selfransom/' + id]);
  }

  goPosition() {
    this.router.navigate(['/position'], {
      queryParams: {
        page: 1,
        pagesize: 10,
        sku: null,
        query: null
      },
      queryParamsHandling: 'merge'
    });
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

  goRestore() {
    this.router.navigate(['/restore']);
  }

  goRestoreChange() {
    this.router.navigate(['/restoreChange']);
  }

  goLiker() {
    this.router.navigate(['/liker']);
  }

  goTariffs() {
    this.router.navigate(['/tariffs']);
  }

  goCreateRansom() {
    this.router.navigate(['/selfransom/create']);
  }

  goPaidRansom() {
    this.router.navigate(['/selfransom/paid']);
  }

  goBasket() {
    this.router.navigate(['/liker/basket']);
  }

  goChoosen() {
    this.router.navigate(['/liker/choosen']);
  }
  goFaq() {
    this.router.navigate(['/faq']);
  }
  goAnswers() {
    this.router.navigate(['/answers']);
  }

  goToWBCard(arg: any) {
    window.open(
      `https://www.wildberries.ru/catalog/${arg}/detail.aspx`,
      '_blank'
    );
  }

  goRefSystem() {
    this.router.navigate(['/refsystem']);
  }

  goPolitics() {
    this.router.navigate(['/politics']);
  }

  goFinance() {
    this.router.navigate(['/finance']);
  }
}
