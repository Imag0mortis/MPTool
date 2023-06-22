import { Component, Input, OnInit } from '@angular/core';
import { RansomCalculationService } from 'src/app/shared/services/ransom-calculation.service';

@Component({
  selector: 'app-ransom-calculation-table',
  templateUrl: './ransom-calculation-table.component.html',
  styleUrls: ['./ransom-calculation-table.component.scss']
})
export class RansomCalculationTableComponent {
  @Input() loading = false;

  constructor(public ransomCalculation: RansomCalculationService) {}
}
