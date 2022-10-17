import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, first } from 'rxjs';
import { Liker } from '../shared/interfaces';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-liker',
  templateUrl: './liker.component.html',
  styleUrls: ['./liker.component.scss']
})
export class LikerComponent implements OnInit {

  form: FormGroup;

  public tableData$: BehaviorSubject<any> = new BehaviorSubject(null);
  tableControl$ = new BehaviorSubject({});

  data = [
    {
      article: 8965485,
      name: "Сева",
      request: "Таро Уэйта",
      review: "Вообще заебсиь",
      likes: {
        countLikes: 3,
        directionLikes: false
      },
      actions: null,
      status: "Выполняется"
    },
    {
      article: 8965485,
      name: "Сева",
      request: "Таро Уэйта",
      review: "Вообще заебсиь",
      likes: {
        countLikes: 3,
        directionLikes: false
      },
      actions: null,
      status: "Отмена"
    },
    {
      article: 8965485,
      name: "Сева",
      request: "Таро Уэйта",
      review: "Вообще заебсиь",
      likes: {
        countLikes: 3,
        directionLikes: false
      },
      actions: null,
      status: "Выполняется"
    }
  ] as const;

  columns = Object.keys(this.data[0]);


  constructor(
    private fb: FormBuilder,
    private request: RequestService
  ) {
    this.form = fb.group({
      article: new FormControl(),
      name: new FormControl(''),
      request: new FormControl(''),
      review: new FormControl(''),
      likes: new FormControl(),
      likesToogle: new FormControl(false)
    })
  }

  likeToogle: boolean = false;

  ngOnInit(): void {
    this.getLikerTasks();
  }

  getLikerTasks() {
    this.request.getLiker(1, 20).pipe(first()).subscribe(
      (r: any) => {
        this.tableData$.next(r['taskList'])
        this.tableControl$.next(r['tableData'])
      }
    )
  }

  newLikerPost() {
    let body: Liker = {
      sku: this.form.get('article')?.value,
      name: this.form.get('name')?.value,
      feedback: this.form.get('review')?.value,
      likes: this.form.get('likes')?.value,
      query: this.form.get('request')?.value,
      isLike: !this.form.get('likesToogle')?.value,
    }

    this.request.postLiker(body).subscribe(
      (r: any) => {
        alert('Задание создано!')
        let newData = this.tableData$.value.concat(r['taskList'])
        this.tableData$.next(newData);
      },
      e => alert('Что-то пошло не так...')
    );
  }

  changeLikeDirection() {
    this.form.get('likesToogle')?.setValue(!this.form.get('likesToogle')?.value)
  }

  cancelLikerTask(id: number) {
    this.request.cancelLiker({
      "task_id": id,
      "action": "cancel"
    }).subscribe(
      r => this.getLikerTasks(),
      e => alert('Что-то пошло не так...')
    )
  }

}
