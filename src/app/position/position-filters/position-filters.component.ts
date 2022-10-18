import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, first, switchMap } from 'rxjs';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-position-filters',
  templateUrl: './position-filters.component.html',
  styleUrls: ['./position-filters.component.scss']
})
export class PositionFiltersComponent implements OnInit {
  public searchRequest: string = "";
  public searchArticle: string = "";

  constructor(
    private request: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    public positions: PositionsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(switchMap(
      (params: Params) => {
        params['sku'] ? this.searchArticle = params['sku'] : null;
        params['query'] ? this.searchRequest = params['query'] : null;
        return this.request.getPositions(params['sku'], params['query'], params['page'])
      })).subscribe(
        (r: any) => {
          this.positions.total$.next(r.tableData.queriesTotal)
          this.positions.page$.next(r.tableData.page)
          this.positions.tableData$.next(r.catalogPositions)
        }
      )
  }

  search() {
    let body = {
      "sku": this.searchArticle,
      "query": this.searchRequest,
      "page": 1,
      "pagesize": 20
    }

    this.positions.tableData$.next(null);

    this.request.setNewSearchQuery(body).pipe(first()).subscribe(
      (r: any) => {
        let queryParams: Params = { sku: this.searchArticle, query: this.searchRequest, page: 1 };
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: queryParams,
            queryParamsHandling: 'merge',
          });
      },
      e => alert('Произошла ошибка')
    )
  }

  clear() {
    let queryParams: Params = { sku: null, query: null, page: 1 };
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: queryParams,
            queryParamsHandling: 'merge',
          });
  }

}
