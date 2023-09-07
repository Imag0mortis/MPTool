import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';

declare function setUsetifulTags(arg: any): void;

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, AfterViewInit {
  usetifulTags: { userId: string; };

  constructor(public appService: AppService, private userService: UserService) {}

  ngOnInit(): void {
    if (environment.production) {
      // Перенести сюда карту и метрику, чтобы лаконично отрисовывались
    }
  }

  ngAfterViewInit(): void {
    this.userService.userSubj$.subscribe(r => {
      if (localStorage.getItem('usetifulID') != null && !document.getElementById('usetifulScript')) {
        setUsetifulTags(r.user_id);
        this.initUsetiful(r.user_id);
      }
    });
  }

  initUsetiful(uId: any) {
    let head = document.getElementsByTagName('head')[0];
    let script: any = document.createElement('script');
    script['async'] = 1;
    script.src = "https://www.usetiful.com/dist/usetiful.js";
    script.setAttribute('id', 'usetifulScript');
    script.dataset.token = "ff8f5b44ca52aed9b607ddfd7484bcac";
    head.appendChild(script);
  }
}
