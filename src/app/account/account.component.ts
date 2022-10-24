import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  account: FormGroup;
  password: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.account = fb.group({
      lastName: new FormControl(""),
      firstName: new FormControl(""),
      middleName: new FormControl(""),
      job: new FormControl(""),
      company: new FormControl(""),
      phone: new FormControl(),
      telegram: new FormControl(""),
    });

    this.password = fb.group({
      password: new FormControl(""),
      oldPassword: new FormControl(""),
      confirmPassword: new FormControl(""),
    });
  }

  ngOnInit(): void {
  }

}
