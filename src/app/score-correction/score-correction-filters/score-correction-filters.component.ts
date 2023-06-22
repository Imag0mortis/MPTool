import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ScoreCorrectionService } from 'src/app/shared/services/score-correction.service';

@Component({
  selector: 'app-score-correction-filters',
  templateUrl: './score-correction-filters.component.html',
  styleUrls: ['./score-correction-filters.component.scss']
})
export class ScoreCorrectionFiltersComponent {
  constructor(
    private request: RequestService,
    private scoreCorrection: ScoreCorrectionService
  ) {}

  searchArticle = '';

  search() {
    this.request.getCalcRating(this.searchArticle).subscribe(
      (r: any) => this.scoreCorrection.scoreCorrectionData$.next(r),
      (e: unknown) => alert('Ошибка!')
    );
  }
}
