import { Component, OnInit } from '@angular/core';
import { RealBidService } from 'src/app/shared/services/real-bid.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-real-price-filters',
  templateUrl: './real-price-filters.component.html',
  styleUrls: ['./real-price-filters.component.scss']
})
export class RealPriceFiltersComponent {
  constructor(
    private request: RequestService,
    private realBid: RealBidService
  ) {}

  public searchRequest = '';

  search() {
    this.request.getRealBids(this.searchRequest).subscribe(
      (r: any) => this.realBid.realBidData$.next(r.bid),
      (e: unknown) => alert('Ошибка!')
    );
  }
}
