import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ransom-calculation-filters',
  templateUrl: './ransom-calculation-filters.component.html',
  styleUrls: ['./ransom-calculation-filters.component.scss']
})
export class RansomCalculationFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchRequest: string = "";
  searchPosition: string = "";

}
