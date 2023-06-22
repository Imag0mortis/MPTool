import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-main-ransom-card',
  templateUrl: './ransom-card.component.html',
  styleUrls: ['./ransom-card.component.scss']
})
export class RansomMainCardComponent {
  constructor(public appService: AppService) {}

  @Input() item: any;
  index: any = 0;
}
