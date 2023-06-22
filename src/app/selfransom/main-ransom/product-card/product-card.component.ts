import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;

  skuName: string;
  statusInfo: string;

  constructor(private request: RequestService) {}

  ngOnInit(): void {
    const content: string[] = ['<ul>'];
    this.product.status.forEach((element: any) => {
      content.push(`<li>${element.taskState} : ${element.count}</li>`);
    });
    content.push('</ul>');
    this.statusInfo = content.join('');
  }

  get counter() {
    return this.product.status.reduce(
      (accumulator: number, el: any) => accumulator + el.count,
      0
    );
  }
}
