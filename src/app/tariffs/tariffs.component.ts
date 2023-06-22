import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { first, Subscription, switchMap } from 'rxjs';
import { RequestService } from '../shared/services/request.service';
import { UserService } from '../shared/services/user.service';
import { TARIFFS_CONFIG } from './tariffs.conf';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent implements OnInit, OnDestroy {
  constructor(
    private request: RequestService,
    public user: UserService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  tariff = 'Free';
  sub: Subscription = new Subscription();
  tariffs = TARIFFS_CONFIG;
  newTariff = {
    name: '',
    ammount: 0
  };

  duration = 1;

  ngOnInit(): void {
    this.getTariff();
  }

  getTariff() {
    this.sub = this.user.userSubj$.subscribe(
      (r) => (this.tariff = r?.tariff_info?.tariff_name)
    );
  }

  durationToggle(arg: number) {
    this.duration = arg;
  }

  getMatchAmmount(value: number): number {
    switch (this.duration) {
      case 3:
        return Math.floor(value * 3 - value * 3 * 0.1);
      case 4:
        return Math.floor(value * 6 - value * 6 * 0.15);
      default:
        return value;
    }
  }

  setTariff(id: number, content?: any) {
    if (this.tariff === 'Free') {
      this.updateTariff(id);
    } else {
      this.request
        .setTariff({
          tariff_id: id,
          months: this.duration,
          confirm: false
        })
        .pipe(
          switchMap((res: any) => {
            const newTariff = this.tariffs.find((el) => el.id === id);
            this.newTariff = {
              name: newTariff!.name,
              ammount: res.totalCost
            };
            return this.dialogService.open(content);
          })
        )
        .pipe(first())
        .subscribe(
          (r) => {
            this.updateTariff(id);
            this.user.updateUserInfo();
          },
          (e: unknown) => console.error(e),
          () => console.log('complete')
        );
    }
  }
  updateTariff(id: number) {
    this.request
      .setTariff({
        tariff_id: id,
        months: this.duration,
        confirm: true
      })
      .subscribe((r) => this.user.updateUserInfo());
  }

  isEnabled(index: number): boolean {
    const idx = this.tariffs.findIndex((el) => el.name === this.tariff);
    return !(idx <= index - 1);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
