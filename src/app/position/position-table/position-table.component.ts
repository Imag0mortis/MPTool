import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = [
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    },
    {
      article: 8965485,
      date: "26.09.2022",
      position: 3252,
      request: "Таро Уэйта"
    }
  ] as const;

  columns = Object.keys(this.data[0]);

}
