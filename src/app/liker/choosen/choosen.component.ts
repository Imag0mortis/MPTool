import { Component, Inject, OnInit } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { LikerFavoritesTask } from 'src/app/shared/interfaces';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';

interface TaskData {
  executionHours: number;
  taskID: number;
  taskState: string;
  timeCreated: number;
  userID: number;
  favouritesRemaining: number;
  link: string;
}

@Component({
  selector: 'app-choosen',
  templateUrl: './choosen.component.html',
  styleUrls: ['./choosen.component.scss']
})
export class ChoosenComponent implements OnInit {
  link = '';
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
    if (!this.link || !this.quantity) {
      const options: any = { label: 'Ошибка!', status: 'error' };
      this.alertService.open('Заполните все поля', options).subscribe();
      return;
    }

    const body: LikerFavoritesTask = {
      link: this.link,
      hours: this.period * 24,
      likes: Number(this.quantity)
    };

    this.requestService.createFavoritesTask(body).subscribe(
      () => this.getData(1),
      (error: any) => {
        if (error.error.errorDesc === 'insufficient_balance') {
          console.log('Ошибка', error)
        } else if (error.error.errorDesc === 'incorrect_query') {
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService.open('Введите корректную ссылку', options).subscribe();
        }
      }
    );
  }

  getData(page: number): void {
    this.requestService.getFavoritesTask(page, 5).subscribe((response: any) => {
      this.tasks = response.taskList;
      this.length = response.tableData.pagesTotal;
      this.userService.updateUserInfo();
      this.link = '';
      this.quantity = undefined;
      this.period = 0;
    });
  }

  goToPage(event: any): void {
    this.index = event;
    this.getData(event + 1);
  }

  isCancelButtonEnabled(taskState: string): boolean {
    return (
      taskState === 'Ошибка (Неверные данные)' ||
      taskState === 'Ожидание выполнения'
    );
  }

  cancelTask = (taskId: number): void => {
    const body = {
      task_id: String(taskId),
      action: 'cancel'
    };
    this.requestService.changeFavoritesTask(body).subscribe(
      () => {
        this.getData(1);
      },
      (error: unknown) => {
        const options: any = { label: 'Ошибка!', status: 'error' };
        this.alertService.open(
          'Что-то пошло не так! Повторите попытку позднее!',
          options
        );
      }
    );
  };
}

interface TaskData {
  executionHours: number;
  taskID: number;
  taskState: string;
  timeCreated: number;
  userID: number;
  favouritesRemaining: number;
  link: string;
}
