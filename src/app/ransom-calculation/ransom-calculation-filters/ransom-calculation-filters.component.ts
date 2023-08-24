import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, of, retry } from 'rxjs';
import { RansomCalculationService } from 'src/app/shared/services/ransom-calculation.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-ransom-calculation-filters',
  templateUrl: './ransom-calculation-filters.component.html',
  styleUrls: ['./ransom-calculation-filters.component.scss']
})
export class RansomCalculationFiltersComponent {
  loading = false;

  @Output() load = new EventEmitter<boolean>();

  constructor(
    private request: RequestService,
    private ransomCalculation: RansomCalculationService
  ) {}

  search() {
    this.load.emit(true);
    this.request
      .getSelfpurchase(this.searchRequest, this.searchPosition)
      .pipe(
        retry(3),
        catchError((error) => {
          console.error('An error occurred:', error);
          return of(null);
        })
      )
      .subscribe((r) => {
        if (r !== null) {
          this.ransomCalculation.rancomCalculationData$.next(r);
        }
        this.load.emit(false);
      });
  }

  clear() {
    this.ransomCalculation.rancomCalculationData$.next(null);
  }

  searchRequest = '';
  searchPosition = 1;
}
