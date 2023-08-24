import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FeedbackWbApiKey, WbApi } from '../shared/interfaces';
import { AppService } from '../shared/services/app.service';
import { RequestService } from '../shared/services/request.service';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-feedback-token',
  templateUrl: './feedback-token.component.html',
  styleUrls: ['./feedback-token.component.scss']
})
export class FeedbackTokenComponent implements OnInit {
  @ViewChild('editApiKeys') modal: ElementRef;

  apiForm: FormGroup;
  apiKeys: WbApi[];
  selectedApiKey: WbApi | null = null;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    public appService: AppService,
    fb: FormBuilder,
    private requestService: RequestService
  ) {
    this.apiForm = fb.group({
      companyName: new FormControl(''),
      apiKey: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.requestService.getFeedbacksWbApiKeys().subscribe({
      next: (data: FeedbackWbApiKey[]) => {
        if (data.length > 0) {
          this.apiKeys = data;
        }
      },
      error: (error: string) => {
        console.log('Ошибка при получении данных:', error);
      }
    });
  }

  redactWbApi(item: any) {
    item['lkId'] = item['lkID'];
    delete item['lkID'];
    this.selectedApiKey = item;
    this.showDialog(this.modal);
  }

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }

  onEditApiKey(observer: Observer<void>) {
    if (this.selectedApiKey) {
      this.requestService
        .updateFeedbacksWbApiKey(this.selectedApiKey)
        .subscribe(() => {
          observer.complete();
          alert('API ключ успешно отредактирован');
          location.reload();
        });
    }
  }

  setWbApi() {
    const body: Omit<FeedbackWbApiKey, 'lkID'> = {
      companyName: this.apiForm.get('companyName')?.value,
      apiKey: this.apiForm.get('apiKey')?.value
    };

    this.requestService.setFeedbacksWbApiKey(body).subscribe(() => {
      alert('API ключ успешно установлен');
      location.reload();
    });
  }

  deleteApi(lkId: number) {
    this.requestService.deleteFeedbacksWbApiKey(lkId).subscribe({
      next: () => {
        location.reload();
        console.log('API успешно удалено');
      },
      error: (error: string) => {
        console.error('Ошибка при удалении API:', error);
      }
    });
  }
}
