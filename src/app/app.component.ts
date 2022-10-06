import { Component, OnInit } from '@angular/core';
import { AppService } from './shared/services/app.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MPTool';

  constructor(
    private appService: AppService,
    private user: UserService
  ) {
  }

  ngOnInit() {
    this.appService.init();

    if(localStorage.getItem('token')) {
      this.user.initUsersData();
    }
    
  }
}
