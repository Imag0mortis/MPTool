import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ransom-calculation',
  templateUrl: './ransom-calculation.component.html',
  styleUrls: ['./ransom-calculation.component.scss']
})
export class RansomCalculationComponent implements OnInit {

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  eventFromFilter(event: boolean) {
    this.loading = event;
  }

}
