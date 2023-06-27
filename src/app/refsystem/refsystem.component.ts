import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppService } from 'src/app/shared/services/app.service';
import { Referal } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-refsystem',
  templateUrl: './refsystem.component.html',
  styleUrls: ['./refsystem.component.scss']
})
export class RefsystemComponent implements OnInit {
  refinfo: refinfo[] = [];
  length = 0;
  myService: any;
  link = '';
  total_registrations: number;
  total_sum: number;
  index = 0;

  page = 1;
  pageSize = 20;

  links: refinfo[] = [];

  constructor(
    private requestService: RequestService,
    private readonly alertService: TuiAlertService,
    private userService: UserService,
    public appService: AppService,
    private request: RequestService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.getData(this.page);
  }

  generateLink(quantity: number, type: string) {
    this.request.createLink(quantity, type).subscribe((response: any) => {
      this.link = response.link;
    });
  }

  onCreateLinkClick() {
    const quantity = 1;
    const type = 'someType';
    this.request.createLink(quantity, type).subscribe((response: any) => {
      console.log(response.link);
      location.reload();
    });
  }

  test() {
    console.log('ссылка', this.link);
  }

  onBalanceWithdrawal() {
    this.request
      .balanceWithdrawali({
        action: 'string'
      })
      .subscribe(
        (r) => this.userService.updateUserInfo(),
        (e: unknown) => alert('Ошибка. Отсутствуют средства на балансе.')
      );
  }

  getData(page: number) {
    this.requestService
      .getReferalInfo(page, this.pageSize)
      .subscribe((r: any) => {
        this.links = r.links;
        this.length = r.tableData.pagesTotal;
        this.index = r.tableData.page - 1;
        this.total_registrations = r.total_registrations;
        this.total_sum = r.total_sum;
      });
  }

  goToPage(event: any) {
    this.index = event;
    this.getData(event + 1);
  }

  deleteLink(item: refinfo) {
    this.requestService.deleteLink(item.link).subscribe(
      () => this.getData(1),
      (error: unknown) => {
        console.error(error);
      }
    );
  }
}

interface refinfo {
  date_created: number;
  hits: number;
  id: number;
  link: string;
  referral_comission: number;
  registers: number;
  total_registrations: number;
  total_sum: number;
  sum_total: number;
}