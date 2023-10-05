import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-main-ransom-card',
  templateUrl: './ransom-card.component.html',
  styleUrls: ['./ransom-card.component.scss']
})
export class RansomMainCardComponent {
  constructor(
    public appService: AppService,
    private requestService: RequestService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  @Input() item: any;
  @Output() refreshGetData = new EventEmitter();
  index: any = 0;

  getData(task_id: any) {
    this.requestService.getSelfRansomDuplicate(task_id).subscribe((r: any) => {
      if (r.tasks && r.tasks.length > 0) {
        const requestData = {
          task: r.tasks.map((task: any) => ({
            sku: task.sku.toString(),
            name: task.name,
            price: task.price,
            quantity: task.quantity,
            query: task.query,
            sex: task.sex,
            size: task.size,
            address: task.address
          }))
        };
        this.requestService.createSelfransomTask(requestData).subscribe(
          (response: any) => {
            const options: any = { status: 'success' };
            this.alertService.open('Задание дублировано', options).subscribe();
            this.refreshGetData.emit();
          },
          (error: any) => {
            const options: any = { status: 'error' };
            this.alertService
              .open('Ошибка при дублировании', options)
              .subscribe();
          }
        );
      }
    });
  }
}