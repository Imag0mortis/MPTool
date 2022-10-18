import { Component, OnInit } from '@angular/core';
import { RansomCalculationService } from 'src/app/shared/services/ransom-calculation.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-ransom-calculation-filters',
  templateUrl: './ransom-calculation-filters.component.html',
  styleUrls: ['./ransom-calculation-filters.component.scss']
})
export class RansomCalculationFiltersComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private request: RequestService,
    private ransomCalculation: RansomCalculationService
  ) { }

  ngOnInit(): void {
    
  }

  search() {
    this.request.getSelfpurchase(this.searchRequest, this.searchPosition).subscribe(
      r => {
        this.ransomCalculation.rancomCalculationData$.next(r);
      }
    )
  }

  clear() {
    this.ransomCalculation.rancomCalculationData$.next(null)
  }

  searchRequest: string = "";
  searchPosition: number = 1;

}
