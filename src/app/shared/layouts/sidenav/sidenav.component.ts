import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { MenuConfiguration } from './sidenav-menu.conf';
import { SupportConfiguration } from './sidenav-menu.conf';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  menuConf = MenuConfiguration;
  SupportConf = SupportConfiguration;

  exp = [false, false, false];

  Expandion(index: number) {
    const menuItem = this.menuConf[index];
    if (menuItem.expanded) {
      menuItem.expanded = false;
    } else {
      this.menuConf.forEach((menu, i) => (menu.expanded = i === index));
    }
  }

  SupportExpandion(index: number) {
    const menuItem = this.SupportConf[index];
    if (menuItem.expanded) {
      menuItem.expanded = false;
    } else {
      this.SupportConf.forEach((menu, i) => (menu.expanded = i === index));
    }
  }

  constructor(public appService: AppService) {}
}
