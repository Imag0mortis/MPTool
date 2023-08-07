import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Inject,
  Injector
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { TuiAlertService } from '@taiga-ui/core';
import { WbFeedbackService } from 'src/app/shared/services/wb-feedback.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];

  text = '';

  subscription: Subscription = new Subscription();

  columns = ['product', 'review', 'autoAnswer'];

  feedbackTextMap: { [key: string]: string } = {};

  disabledFeedbacksFromAI = new Set<string>();

  disabledFeedbacksPost = new Set<string>();

  constructor(
    public appService: AppService,
    private request: RequestService,
    private feedbackService: WbFeedbackService,
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.data.forEach((item) => {
        this.feedbackTextMap[item.id] = item.text;
      });
    }
  }

  getAnswer(feedback: any): void {
    this.disabledFeedbacksFromAI.add(feedback.id);

    this.alertService
      .open('Подождите пока ChatGPT сгенерирует автоответ')
      .subscribe();

    this.request
      .getAnswerFromAI({
        feedback: feedback.text,
        feedbackId: feedback.id
      })
      .subscribe(
        (v: any) => {
          this.feedbackTextMap[feedback.id] = v.answer;
        },
        (error: any) => {
          console.error(error);
          this.alertService
            .open('Произошла ошибка, попытайтесь снова')
            .subscribe();
          this.disabledFeedbacksFromAI.delete(feedback.id);
        },
        () => {
          this.disabledFeedbacksFromAI.delete(feedback.id);
        }
      );
  }

  isButtonGetAnswerDisabled(feedbackId: string): boolean {
    return this.disabledFeedbacksFromAI.has(feedbackId);
  }

  postFeedback(feedback: any): void {
    const lkId = this.feedbackService.currentCompanyID.value;
    this.disabledFeedbacksPost.add(feedback.id);
    this.alertService.open('Ваш отзыв отправлен на сервер').subscribe();
    this.request
      .publishFeedback({
        lkId: lkId as any,
        feedback: this.feedbackTextMap[feedback.id],
        feedbackId: feedback.id
      })
      .subscribe({
        next: () => {
          this.disabledFeedbacksFromAI.add(feedback.id);
        }
      });
  }

  isButtonPostAnswerDisabled(feedbackId: string): boolean {
    return this.disabledFeedbacksPost.has(feedbackId);
  }

  isTextAreaEmpty(feedbackId: string): boolean {
    return (
      !this.feedbackTextMap[feedbackId] ||
      this.feedbackTextMap[feedbackId].trim() === ''
    );
  }

  getStarArray(valuation: number): number[] {
    return Array(valuation).fill(0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
