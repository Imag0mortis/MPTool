import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {


  index = 0;

  items: review[] = [
    {
      name: "Денчик",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    },
    {
      name: "Сева",
      decription: "Живёт в Барселоне, пьёт Эстрелу Галицию",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    },
    {
      name: "Саня",
      decription: "Живёт в Путилково, пьёт водку",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

interface review {
  name: string;
  avatar: string;
  decription: string;
}