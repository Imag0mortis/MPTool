import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-filters',
  templateUrl: './position-filters.component.html',
  styleUrls: ['./position-filters.component.scss']
})
export class PositionFiltersComponent implements OnInit {
  public searchRequest: string = "";
  public searchArticle: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
