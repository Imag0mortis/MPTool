import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public menuOpened: boolean = true;

  constructor() { }

  menuToogle() {
    this.menuOpened = !this.menuOpened;
  }
}
