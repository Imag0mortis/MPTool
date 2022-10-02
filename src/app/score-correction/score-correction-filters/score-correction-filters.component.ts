import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-correction-filters',
  templateUrl: './score-correction-filters.component.html',
  styleUrls: ['./score-correction-filters.component.scss']
})
export class ScoreCorrectionFiltersComponent implements OnInit {

  constructor() { }

  searchRequest: string = "";
  searchArticle: string = "";

  ngOnInit(): void {
  }

}
