import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-liker',
  templateUrl: './liker.component.html',
  styleUrls: ['./liker.component.scss']
})
export class LikerComponent implements OnInit {

  form: FormGroup;

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
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      article: new FormControl(),
      name: new FormControl(''),
      request: new FormControl(''),
      review: new FormControl(``),
      likes: new FormControl(),
      likesToogle: new FormControl(false)
    })
  }

  likeToogle: boolean = false;

  ngOnInit(): void {
  }

}
