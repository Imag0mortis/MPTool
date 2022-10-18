import { Component, OnInit } from '@angular/core';
import { RealBidService } from 'src/app/shared/services/real-bid.service';

@Component({
  selector: 'app-real-price-table',
  templateUrl: './real-price-table.component.html',
  styleUrls: ['./real-price-table.component.scss']
})
export class RealPriceTableComponent implements OnInit {

  constructor(
    public realBid: RealBidService
  ) { }

  ngOnInit(): void {
  }

  columns = ['position', 'idAdvertiser', 'idProduct', 'realBid'];

}
