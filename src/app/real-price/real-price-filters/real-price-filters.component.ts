import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-price-filters',
  templateUrl: './real-price-filters.component.html',
  styleUrls: ['./real-price-filters.component.scss']
})
export class RealPriceFiltersComponent implements OnInit {

  constructor() { }

  public searchRequest: string = "";

  ngOnInit(): void {
  }

}
