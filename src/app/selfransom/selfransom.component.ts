import { Component, OnInit } from '@angular/core';
import { SelfransomService } from '../shared/services/selfransom.service';

@Component({
  selector: 'app-selfransom',
  templateUrl: './selfransom.component.html',
  styleUrls: ['./selfransom.component.scss']
})
export class SelfransomComponent implements OnInit {
  constructor(private selfransomService: SelfransomService) {}

  ngOnInit(): void {
    this.selfransomService.getUserGeoLocation();
  }
}
