import { Component, Inject, OnInit } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { LikerBasketTask } from 'src/app/shared/interfaces';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';

interface TaskData {
  basketRemaining: number;
  executionHours: number;
  query: string;
  sku: number;
  taskID: number;
  taskState: string;
  timeCreated: number;
  userID: number;
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  sku: number | undefined;
  request = '';
  quantity: number | undefined;
  period = 1;

  index = 0;
  length = 0;

  tasks: TaskData[] = [];

  periodDict = [
    { days: 1, name: 'В течение одного дня' },
    { days: 2, name: 'В течение двух дней' },
    { days: 3, name: 'В течение трех дней' }
  ];

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.getData(1);
  }

  create(): void {
    if (!this.sku || !this.request || !this.quantity) {
      const options: any = { label: 'Ошибка!', status: 'error' };
      this.alertService.open('Заполните все поля', options).subscribe();
      return;
    }

    const body: LikerBasketTask = {
      sku: Number(this.sku),
      query: this.request,
      hours: this.period * 24,
      likes: Number(this.quantity)
    };

    this.requestService.createBasketTask(body).subscribe(
      () => this.getData(1),
      (error: any) => {
        if (error.error.errorDesc === 'insufficient_balance') {
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService.open('На счету недостаточно средств', options).subscribe();
        }
      }
    );
  }


  getData(page: number) {
    this.requestService.getBasketTask(page, 5).subscribe((r: any) => {
      this.tasks = r.taskList;
      this.length = r.tableData.pagesTotal;
      this.userService.updateUserInfo();
      this.sku = undefined;
      this.request = '';
      this.quantity = undefined;
      this.period = 0;
    });
  }

  goToPage(event: any) {
    this.index = event;
    this.getData(event + 1);
  }

  isCancelButtonEnabled(taskState: string): boolean {
    return taskState === 'Ошибка(Неверные данные)' || taskState === 'Ожидание выполнения';
  }
  
  validateOnlyNumbers(event: any): void {
    const inputValue: string = event.value;
    const numbersOnly = inputValue.replace(/\D/g, '');
    this.sku = +numbersOnly;
  }

  cancelTask = (arg: number) => {
    const body = {
      task_id: String(arg),
      action: 'cancel'
    };
    this.requestService.changeBasketTask(body).subscribe(
      (success) => {
        this.getData(1);
      },
      (error: unknown) => {
        const options: any = { label: 'Ошибка!', status: 'error' };
        this.alertService.open(
          'Что-то пошло не так! Повторите попытку позднее!',
          options
        ).subscribe();
      }
    );
  };
}

interface TaskData {
  basketRemaining: number;
  executionHours: number;
  query: string;
  sku: number;
  taskID: number;
  taskState: string;
  timeCreated: number;
  userID: number;
}
