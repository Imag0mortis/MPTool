import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-main-ransom-card',
  templateUrl: './ransom-card.component.html',
  styleUrls: ['./ransom-card.component.scss']
})
export class RansomMainCardComponent {
  constructor(public appService: AppService, private request: RequestService) {}

  @Input() item: any;
  index: any = 0;

  public copyTask(item: any) {
    if (item && item.tasks && item.tasks.length > 0) {

      const tasksToCopy = item.tasks.filter((task: any) => task.taskState === 'Ожидает оплаты');
  
      if (tasksToCopy.length === 0) {
        console.log('Нет задач для дублирования.');
        return;
      }
      const dataToCopy = {
        task: tasksToCopy.map((task: any) => ({
          sku: task.sku,
          name: task.name,
          price: task.price,
          quantity: task.quantityRemaining,
          size: task.size,
          query: task.query,
          sex: task.sex,
          address: task.address,
          pickupID: task.pickupID,
        })),
      };
      this.sendTaskToServer(dataToCopy);
    } else {
      console.error('item, item.tasks, или item.tasks.length могут отсутствовать или быть undefined.');
    }
  }

  private sendTaskToServer(taskInfo: any) {
    this.request.createSelfransomTask(taskInfo).subscribe(
      (response) => {
        console.log('Задача успешно создана на сервере', response);
      },
      (error) => {
        console.error('Ошибка при создании задачи на сервере', error);
      }
    );
  }
}
