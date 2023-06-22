import { Component, OnInit, Inject, Injector } from '@angular/core';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MenuConfiguration } from '../sidenav/sidenav-menu.conf';
import { TuiDialogService } from '@taiga-ui/core';
import { PaymentModalComponent } from '../balance/payment-modal/payment-modal.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  open = false;
  openMobile = false;
  menuConf = MenuConfiguration;

  toggle(open: boolean) {
    this.open = open;
  }

  toggleMobile(openMobile: boolean) {
    this.openMobile = openMobile;
  }

  constructor(
    public appService: AppService,
    public authService: AuthService,
    public user: UserService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  private dialog: any;

  onClick(): void {
    this.open = !this.open;
  }

  onClickMobileMenu(): void {
    this.open = !this.open;
  }

  onObscured(obscured: any): void {
    if (obscured) {
      this.open = false;
    }
  }

  onActiveZone(active: any): void {
    this.open = !this.open;
    this.open = active && this.open;
  }

  ngOnInit(): void {
    this.user.initUsersData();
    this.user.userSubj$.subscribe((r) => {
      this.dialog = this.dialogService.open<number>(
        new PolymorpheusComponent(PaymentModalComponent, this.injector)
      );
    });
  }

  showDialog(): void {
    this.dialog.subscribe();
  }
}
