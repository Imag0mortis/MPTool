import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss']
})
export class LogTableComponent {
  @Input() data: any;
  columns = ['time', 'bid', 'place', 'subject'];
}
