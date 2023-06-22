import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { BehaviorSubject, first } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Liker } from '../../shared/interfaces';
import { RequestService } from '../../shared/services/request.service';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {
  form: FormGroup;

  index = 0;
  length = 0;

  tasks: TaskData[] = [];

  public tableData$: BehaviorSubject<any> = new BehaviorSubject(null);
  tableControl$ = new BehaviorSubject({});

  columns = [
    'article',
    'name',
    'request',
    'review',
    'likes',
    'actions',
    'status'
  ];

  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private userService: UserService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    public appService: AppService
  ) {
    this.form = fb.group({
      article: new FormControl(),
      name: new FormControl(''),
      request: new FormControl(''),
      review: new FormControl(''),
      likes: new FormControl(),
      likesToogle: new FormControl(false)
    });
  }

  likeToogle = false;

  ngOnInit(): void {
    this.getLikerTasks();
  }

  getLiker(page: number) {
    this.request.getLiker(page, 5).subscribe((r: any) => {
      this.tableData$.next(r['taskList']);
      this.tableControl$.next(r['tableData']);
      this.tasks = r.taskList;
      this.length = r.tableData.pagesTotal;
      this.userService.updateUserInfo();
    });
  }

  goToPage(event: any) {
    this.index = event;
    this.getLiker(event + 1);
  }

  getLikerTasks() {
    this.request
      .getLiker(1, 5)
      .pipe(first())
      .subscribe((r: any) => {
        this.tableData$.next(r['taskList']);
        this.tableControl$.next(r['tableData']);
        this.tasks = r.taskList;
        this.length = r.tableData.pagesTotal;
        this.userService.updateUserInfo();
      });
  }

  newLikerPost() {
    const body: Liker = {
      sku: this.form.get('article')?.value,
      name: this.form.get('name')?.value,
      feedback: this.form.get('review')?.value,
      likes: this.form.get('likes')?.value,
      query: this.form.get('request')?.value,
      isLike: this.form.get('likesToogle')?.value
    };

    this.request.postLiker(body).subscribe(
      (r: any) => {
        alert('Задание создано!');
        this.form.reset();
        this.userService.updateUserInfo();
        const newData = this.tableData$.value.concat(r['taskList']);
        this.tableData$.next(newData);
      },
      (e: any) => {
        if (e.error.errorDesc === 'insuffient_balance') {
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService.open('На счету недостаточно средств', options);
        }
      }
    );
  }

  changeLikeDirection() {
    this.form
      .get('likesToogle')
      ?.setValue(!this.form.get('likesToogle')?.value);
  }

  cancelLikerTask(id: number) {
    console.log(id);

    this.request
      .cancelLiker({
        task_id: id,
        action: 'cancel'
      })
      .subscribe(
        (r) => this.getLikerTasks(),
        (e: unknown) => {
          const options: any = { label: 'Ошибка!', status: 'error' };
          this.alertService.open(
            'Что-то пошло не так! Повторите попытку позднее!',
            options
          );
        }
      );
  }
}

interface TaskData {
  executionHours: number;
  query: string;
  taskID: number;
  taskState: string;
  timeCreated: number;
  userID: number;
}
