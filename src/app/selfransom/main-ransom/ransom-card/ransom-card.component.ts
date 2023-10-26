import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { SelfransomService } from 'src/app/shared/services/selfransom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-ransom-card',
  templateUrl: './ransom-card.component.html',
  styleUrls: ['./ransom-card.component.scss']
})
export class RansomMainCardComponent {
  constructor(
    public appService: AppService,
    private selfransomService: SelfransomService,
    private router: Router,
    private requestService: RequestService,
  ) {}

  @Input() item: any;
  index: any = 0;

  getData(task_id: any) {
    this.requestService.getSelfransomTask(task_id).subscribe((r: any) => {
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
            address: task.address,
            imgLink: task.imgLink,
          }))
        };
        this.selfransomService.setRansomData(requestData);
        this.router.navigate(['/create-ransom']);
      }
    });
  }  
}