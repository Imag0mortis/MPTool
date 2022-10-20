import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiComparator, tuiDefaultSort } from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    tuiControlValue,
    TuiDay,
    tuiToInt,
} from '@taiga-ui/cdk';
import { TUI_ARROW } from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest, Observable, of, Subscription, timer } from 'rxjs';
import {
    map
} from 'rxjs/operators';
import { AdsService } from 'src/app/shared/services/ads.service';
import { AppService } from 'src/app/shared/services/app.service';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';

interface User {
    readonly name: string;
    readonly dob: TuiDay;
}

const TODAY = TuiDay.currentLocal();
const FIRST = [
    `John`,
    `Jane`,
    `Jack`,
    `Jill`,
    `James`,
    `Joan`,
    `Jim`,
    `Julia`,
    `Joe`,
    `Julia`,
];

const LAST = [
    `Smith`,
    `West`,
    `Brown`,
    `Jones`,
    `Davis`,
    `Miller`,
    `Johnson`,
    `Jackson`,
    `Williams`,
    `Wilson`,
];

type Key = 'name' | 'dob' | 'age';

const DATA: readonly User[] = Array.from({ length: 300 }, () => ({
    name: `${LAST[Math.floor(Math.random() * 10)]}, ${FIRST[Math.floor(Math.random() * 10)]
        }`,
    dob: TODAY.append({ day: -Math.floor(Math.random() * 400000) - 7500 }),
}));
const KEYS: Record<string, Key> = {
    Name: `name`,
    Age: `age`,
    'Date of Birth': `dob`,
};

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {

    constructor(
        public appService: AppService,
        private user: UserService,
        private request: RequestService,
        public filtersService: FiltersService,
        public ads: AdsService,
        private router: Router
    ) { }
    subscription: Subscription = new Subscription;
    private readonly size$ = new BehaviorSubject(10);

    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>(`name`);

    readonly minAge = new FormControl(21);

    initial: readonly string[] = [`Banner`, `Name`, `Type`, `Target`, `Bid`, `Budget`, `Status`, `Action`, `OnOffToogle`, `Menu`];

    enabled = this.initial;

    columns = [`banner`, `name`, `type`, `target`, `bid`, `budget`, `status`, `action`, `onOffToogle`, `menu`];

    search = ``;

    readonly arrow = TUI_ARROW;

    //readonly loading$ = this.request$.pipe(map(value => !value));


    onEnabled(enabled: readonly string[]): void {
        this.enabled = enabled;
        this.columns = this.initial
            .filter(column => enabled.includes(column))
            .map(column => KEYS[column]);
    }

    onDirection(direction: -1 | 1): void {
        this.direction$.next(direction);
    }

    onSize(size: number): void {
        this.size$.next(size);
    }

    onPage(page: number): void {
        this.ads.page$.next(page);
        this.router.navigate(['/campaigns'], {
            queryParams: {
              page: page + 1
            },
            queryParamsHandling: 'merge',
        });
    }

    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }

    getBudget(user: User): number {
        return getBudget(user);
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    toggleCampaign(id: number, isEnabled: boolean, targetBid: number, targetPlace: number) {
        if(targetBid > 0 && targetPlace > 0) {
            let body = {
                "campaign_id": id, "enable": isEnabled
            }
            this.request.saveCampaign(body).subscribe(
                r => null/*console.log(r)*/
            )
        }
        else alert('Целевая ставка или позиция не может быть равно 0!')
        
    }

    public syncAdd() {
        this.request.syncAds(this.user.userSubj$.value.user_wb_companies[0].lk_id).subscribe(
            r => alert('Кампании обновятся в течении минимум 5 минут')
        )
    }
}

function sortBy(key: 'name' | 'dob' | 'age', direction: -1 | 1): TuiComparator<User> {
    return (a, b) =>
        key === `age`
            ? direction * tuiDefaultSort(getBudget(a), getBudget(b))
            : direction * tuiDefaultSort(a[key], b[key]);
}

function getBudget({ dob }: User): number {
    const years = TODAY.year - dob.year;
    const months = TODAY.month - dob.month;
    const days = TODAY.day - dob.day;
    const offset = tuiToInt(months > 0 || (!months && days > 9));

    return years + offset;
}
