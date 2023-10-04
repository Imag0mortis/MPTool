import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-zp',
  templateUrl: './zp.component.html',
  styleUrls: ['./zp.component.scss']
})
export class ZpComponent {
  constructor(
    private userService: UserService,
    private request: RequestService
  ) {}

  gived() {
    let body = this.userService.userSubj$.value;
    let temp = {
      name: body.self_info.name,
      last_name: body.self_info.last_name,
      middle_name: body.self_info.middle_name,
      company_name: body.self_info.company_name,
      company_position: '1',
      phone: body.self_info.phone,
      telegram: body.self_info.telegram,
      balance: body.self_info.balance
    };
    this.request.setNewProfileData(temp).subscribe(() => {
      this.userService.updateUserInfo();
    });
  }
  notGived() {
    let body = this.userService.userSubj$.value;
    let temp = {
      name: body.self_info.name,
      last_name: body.self_info.last_name,
      middle_name: body.self_info.middle_name,
      company_name: body.self_info.company_name,
      company_position: '0',
      phone: body.self_info.phone,
      telegram: body.self_info.telegram,
      balance: body.self_info.balance
    };
    this.request.setNewProfileData(temp).subscribe(() => {
      this.userService.updateUserInfo();
    });
  }
}
