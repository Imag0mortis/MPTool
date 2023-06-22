import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LikerQuestionsTask } from 'src/app/shared/interfaces';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  @Input() total = 0;

  sku: number | undefined;
  question = '';
  sex = 'Мужской';

  index = 0;
  length = 0;
  tasks: TaskData[] = [];

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private alertService: TuiAlertService
  ) {}

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getData(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get getPagesLength() {
    return Math.ceil(this.total / 10);
  }

  create() {
    const body: LikerQuestionsTask = {
      sku: Number(this.sku),
      question: this.question,
      sex: this.sex
    };
    this.requestService
      .createQuestionsTask(body)
      .subscribe((r) => this.getData(1));
  }

  getData(page: number) {
    this.requestService.getQuestionsTask(page, 5).subscribe((r: any) => {
      this.tasks = r.taskList;
      this.length = r.tableData.pagesTotal;
      this.sku = undefined;
      this.question = '';
      this.sex = '';
    });
    this.userService.updateUserInfo();
  }

  goToPage(event: any) {
    this.index = event;
    this.getData(event + 1);
  }

  cancelTask = (arg: number) => {
    const body = {
      task_id: String(arg),
      action: 'cancel'
    };
    this.requestService.changeQuestionsTask(body).subscribe(
      (success) => {
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
  question: string;
  sex: string;
  sku: number;
  taskID: number;
  taskState: string;
  timeCreated: number;
  userID: number;
}
