import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppService } from 'src/app/shared/services/app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  filter_state = -1;
  testValue = new FormControl();
  filter = 1;

  activeItemIndex = 0;

  items = [
    'по номеру выкупа',
    'по артикулу',
    'по имени',
    'по дате создания',
    'по дате публикации'
  ];

  constructor(
    public appService: AppService,
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    private request: RequestService,
    private user: UserService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private router: Router,
    private requestService: RequestService
  ) {}
  onTabChange(tabIndex: number) {
    this.filter_state = tabIndex;
    this.onFilterChange();
  }

  onFilterChange() {
    if (this.testValue.value) {
      this.requestService
        .getReviewsByFilter(1, 20, this.filter_state, this.testValue.value)
        .subscribe();
    }
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }

  buyFeedbackPackages(quantity: number) {
    this.request.buyPackages('feedback', quantity).subscribe((r: any) => {
      if (r && r['result'] === 'ok') {
        const options: any = { label: 'Успешно!', status: 'success' };
        this.alertService.open(
          `Вы приобрели пакет на ${quantity} отзывов!`,
          options
        );
        this.user.updateUserInfo();
      }
    });
  }
}
