import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-price-table',
  templateUrl: './real-price-table.component.html',
  styleUrls: ['./real-price-table.component.scss']
})
export class RealPriceTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = [
    {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    },
    {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    },
    {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }, {
      position: 1,
      idAdvertiser: 265684,
      idProduct: 1323525,
      realBid: 4146
    }
  ] as const;

  columns = Object.keys(this.data[0]);

}
