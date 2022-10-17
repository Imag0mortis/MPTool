import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
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
    private router: Router
  ) {
    this.route.queryParams.pipe(switchMap(
      (params: Params) => {
        params['sku'] ? this.searchArticle = params['sku'] : null;
        params['query'] ? this.searchRequest = params['query'] : null;
        return this.request.getPositions(params['sku'], params['query'])
      }
      /*(params: Params) => {
          this.page$.next(params['page']);
          if (params['lk']) {
              this.getData(params)
          }
      }) */)).subscribe(
        r => console.log(r)
      )
  }

  ngOnInit(): void {
  }

  search() {
    let body = {
      "sku": this.searchArticle,
      "query": this.searchRequest,
      "page": 1,
      "pagesize": 15
    }

    this.request.setNewSearchQuery(body).pipe(first()).subscribe(
      (r: any) => {

        
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/position'], {
          queryParams: {
            sku: r.sku,
            query: r.query,
          }
        }))
      },
      e => alert('Произошла ошибка')
    )

  }

}
