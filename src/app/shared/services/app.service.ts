import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public menuOpened: boolean = true;
  public menuSelector: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private router: Router
  ) { }

  init() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.menuSelector.next(e.url.substring(1));
      }
    });
  }

  menuToogle() {
    this.menuOpened = !this.menuOpened;
  }

  goCampaigns() {
    this.router.navigate(['/campaigns']);
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

}
