import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { FiltersService } from './filters.service';
import { RequestService } from './request.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AdsService {

    data$: BehaviorSubject<any> = new BehaviorSubject(null)
    page$: BehaviorSubject<any> = new BehaviorSubject(1)
    total$: BehaviorSubject<any> = new BehaviorSubject(null)

    constructor(
        private user: UserService,
        private filter: FiltersService,
        private request: RequestService,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(
            (params: Params) => {
                this.page$.next(params['page']);
                if (params['lk']) {
                    this.getData(params)
                }
            })
    }

    getData(params: Params) {
        this.request.getAds(params['lk'], params['page'], 10, params['state'], params['type']).subscribe(
            (result: any) => {
                this.data$.next(result.adsData);
                this.total$.next(result.tableData.campaignsTotal);
                this.filter.statuses$.next(['Все'].concat(result.stateList));
                this.filter.types$.next(['Все'].concat(result.typeList));
            },
            error => console.log(error))
    }
}
