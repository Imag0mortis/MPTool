import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss']
})
export class LogTableComponent {
  @Input() data: any[];
  columns = ['time', 'bid', 'place', 'subject'];
  visibleData: any[] = [];

  ngOnChanges(): void {
    this.visibleData = this.data.slice(0, 50);
  }

  onScroll(): void {
    const tableContainer = document.querySelector('.table_container-table');
    if (tableContainer) {
      const scrollPosition =
        tableContainer.scrollTop + tableContainer.clientHeight;
      const totalHeight = tableContainer.scrollHeight;
      const remainingHeight = totalHeight - scrollPosition;

      if (remainingHeight < 200) {
        const currentDataLength = this.visibleData.length;
        const newData = this.data.slice(
          currentDataLength,
          currentDataLength + 50
        );
        this.visibleData = [...this.visibleData, ...newData];
      }
    }
  }
}
