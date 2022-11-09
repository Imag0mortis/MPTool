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
      name: "Денчик2",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    },
    {
      name: "Денчик3",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    },
    {
      name: "Денчик4",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    }, {
      name: "Денчик5",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    }, {
      name: "Денчик6",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    }, {
      name: "Денчик7",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    }, {
      name: "Денчик8",
      decription: "Живёт в Липецке, пьёт Липецкий Бювет",
      avatar: "https://memepedia.ru/wp-content/uploads/2021/07/super-denchik.png"
    }
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