import { Component, OnInit } from '@angular/core';
import { RealBidService } from 'src/app/shared/services/real-bid.service';

@Component({
  selector: 'app-real-price-table',
  templateUrl: './real-price-table.component.html',
  styleUrls: ['./real-price-table.component.scss']
})
export class RealPriceTableComponent {
  constructor(public realBid: RealBidService) {}

  columns = ['position', 'idAdvertiser', 'idProduct', 'realBid'];

  goToWBCard(arg: any) {
    window.open(
      `https://www.wildberries.ru/catalog/${arg}/detail.aspx`,
      '_blank'
    );
  }
}
