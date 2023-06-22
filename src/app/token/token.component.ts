import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TokenTask } from '../shared/interfaces';
import { WbApi } from '../shared/interfaces';
import { AppService } from '../shared/services/app.service';
import { RequestService } from '../shared/services/request.service';
import { UserService } from '../shared/services/user.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogSize } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  tokenForm: FormGroup;
  token: FormGroup;
  apiForm: FormGroup;
  apiKey = '';
  companyName = '';
  lkID = 0;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    public appService: AppService,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {
    this.tokenForm = fb.group({
      supplier_id: new FormControl(''),
      wb_token: new FormControl('')
    });
    this.apiForm = fb.group({
      companyName: new FormControl(''),
      apiKey: new FormControl('')
    });
  }

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        size
      })
      .subscribe();
  }

  ngOnInit(): void {
    this.requestService.getWbApiKey().subscribe(
      (data: WbApi[]) => {
        if (data && data.length > 0) {
          this.apiKey = data[0].apiKey;
          this.companyName = data[0].companyName;
          this.lkID = data[0].lkID;
        }
      },
      (error: unknown) => {
        console.log('Ошибка при получении данных:', error);
      }
    );
  }

  setToken() {
    const body: TokenTask = {
      supplier_id: this.tokenForm.get('supplier_id')?.value,
      wb_token: this.tokenForm.get('wb_token')?.value
    };

    this.requestService.postToken(body).subscribe((r: any) => {
      alert('Токен успешно установлен');
    });
  }

  setWbApi() {
    const body: WbApi = {
      companyName: this.apiForm.get('companyName')?.value,
      apiKey: this.apiForm.get('apiKey')?.value,
      lkID: this.lkID
    };

    this.requestService.setWbApiKey(body).subscribe((r: any) => {
      alert('API ключ успешно установлен');
    });
  }
}
