import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PositionsService } from 'src/app/shared/services/positions.service';

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent {
  constructor(public positions: PositionsService, private router: Router) {}

  private readonly size$ = new BehaviorSubject(10);

  columns = ['article', 'date', 'position', 'request'];

  onPage(page: number): void {
    this.positions.page$.next(page);
    this.router.navigate(['/position'], {
      queryParams: {
        page: page + 1
      },
      queryParamsHandling: 'merge'
    });
  }

  onSize(event: any) {
    this.size$.next(event);
  }
}
