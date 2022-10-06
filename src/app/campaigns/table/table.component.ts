import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiComparator, tuiDefaultSort} from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    tuiControlValue,
    TuiDay,
    tuiIsPresent,
    tuiToInt,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, combineLatest, Observable, of, timer} from 'rxjs';
import {
    debounceTime,
    filter,
    map,
    mapTo,
    share,
    startWith,
    switchMap,
} from 'rxjs/operators';
import { AppService } from 'src/app/shared/services/app.service';
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

const DATA: readonly User[] = Array.from({length: 300}, () => ({
    name: `${LAST[Math.floor(Math.random() * 10)]}, ${
        FIRST[Math.floor(Math.random() * 10)]
    }`,
    dob: TODAY.append({day: -Math.floor(Math.random() * 400000) - 7500}),
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
export class TableComponent implements OnInit {

    constructor(
        public appService: AppService,
        private user: UserService,
        private request: RequestService
    ) {}
    
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);

    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>(`name`);

    readonly minAge = new FormControl(21);

    readonly request$ = combineLatest([
        this.sorter$,
        this.direction$,
        this.page$,
        this.size$,
        tuiControlValue<number>(this.minAge),
    ]).pipe(
        // zero time debounce for a case when both key and direction change
        /*debounceTime(0),
        switchMap(query => this.getData(...query).pipe(startWith(null))),
        share(),*/
    );

    initial: readonly string[] = [`Banner`, `Name`, `Type`, `Target`, `Bid`, `Budget`, `Status`, `Action`, `OnOffToogle`, `Menu`];

    enabled = this.initial;

    columns = [`banner`, `name`, `type`, `target`, `bid`, `budget`, `status` , `action`, `onOffToogle`, `menu`];

    search = ``;

    readonly arrow = TUI_ARROW;

    readonly loading$ = this.request$.pipe(map(value => !value));

    readonly total$ = new BehaviorSubject(0)

    readonly data$ = new BehaviorSubject(null);

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
        this.page$.next(page);

        this.getData(page, 10)
    }

    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }

    getBudget(user: User): number {
        return getBudget(user);
    }

    ngOnInit(): void {  
        this.getData(0, 10)
    }



    private getData(pageNum: number, pageSize: number) {
        this.user.userSubj$.pipe(
            switchMap(
                r => {
                    if(r) {
                        return this.request.getAds(r.user_wb_companies[0].lk_id, pageNum, pageSize)
                    }
                    return of(r)
                }
            )
        ).subscribe(
            r => {
                console.log(r.adsData)
                this.data$.next(r.adsData)
                this.page$.next(r.tableData.page)
                this.total$.next(r.tableData.campaignsTotal)
            }
        )
    }

   /* private getData(
        key: 'name' | 'dob' | 'age',
        direction: -1 | 1,
        page: number,
        size: number,
        minAge: number,
    ): Observable<ReadonlyArray<User | null>> {
        console.info(`Making a request`);

        const start = page * size;
        const end = start + size;
        const result = [...DATA]
            .sort(sortBy(key, direction))
            .filter(user => getBudget(user) >= minAge)
            .map((user, index) => (index >= start && index < end ? user : null));

        // Imitating server response
        return timer(10).pipe(mapTo(result));
    }*/
}

function sortBy(key: 'name' | 'dob' | 'age', direction: -1 | 1): TuiComparator<User> {
    return (a, b) =>
        key === `age`
            ? direction * tuiDefaultSort(getBudget(a), getBudget(b))
            : direction * tuiDefaultSort(a[key], b[key]);
}

function getBudget({dob}: User): number {
    const years = TODAY.year - dob.year;
    const months = TODAY.month - dob.month;
    const days = TODAY.day - dob.day;
    const offset = tuiToInt(months > 0 || (!months && days > 9));

    return years + offset;
}
