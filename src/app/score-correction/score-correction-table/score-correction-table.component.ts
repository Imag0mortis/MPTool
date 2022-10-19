import { Component, OnInit } from '@angular/core';
import { ScoreCorrectionService } from 'src/app/shared/services/score-correction.service';

@Component({
  selector: 'app-score-correction-table',
  templateUrl: './score-correction-table.component.html',
  styleUrls: ['./score-correction-table.component.scss']
})
export class ScoreCorrectionTableComponent implements OnInit {

  constructor(
    public scoreCorrection: ScoreCorrectionService
  ) { }

  columns = ['sku', 'mark', 'quantity'];

  ngOnInit(): void {
  }

}
