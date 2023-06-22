import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SelfransomService } from 'src/app/shared/services/selfransom.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Placemark } from 'src/app/selfransom/map-modal/map-modal.component';

@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.scss']
})
export class AddressMapComponent implements OnInit {
  placemark: Placemark;
  @ViewChild('map') map: any;

  constructor(
    public selfRansom: SelfransomService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any>
  ) {}

  ngOnInit(): void {
    this.placemark = this.context!.data!['placemark'];
  }
}
