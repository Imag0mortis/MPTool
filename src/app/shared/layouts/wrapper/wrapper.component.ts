import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  constructor(public appService: AppService, private isMobile: AppService) {}

  ngOnInit(): void {
    if (environment.production) {
      //Перенести сюда карту и метрику, чтобы лаконично отрисовывались
    }
  }
}
