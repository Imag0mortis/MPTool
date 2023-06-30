import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2
} from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { of, switchMap } from 'rxjs';
import { SelfransomService } from 'src/app/shared/services/selfransom.service';
import { Address } from '../create-ransom/create-ransom.component';
import { v4 as uuidv4 } from 'uuid';

export interface Placemark {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
  id: number;
  schedule?: string;
  address?: string;
}

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapModalComponent implements OnInit {
  constructor(
    public selfRansom: SelfransomService,
    private ref: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Address>
  ) {}

  showDetails: showDetailsType = showDetailsType.loading;
  public removeEventListener: (() => void) | any;
  loadingGuard = false;

  clustererOptions: ymaps.IClustererOptions = {
    gridSize: 32,
    clusterDisableClickZoom: false,
    preset: 'islands#greenClusterIcons',
    clusterIconColor: '#d020d6'
  };

  zoom = 14;
  placemarks: Placemark[] = [];

  ngOnInit(): void {
    const idArray: number[] = [];
    this.selfRansom.nearPoints$
      .pipe(
        switchMap((points) => {
          if (points) {
            points.forEach((el: any) => idArray.push(el.id));
            points.forEach((el: any) => {
              this.placemarks.push({
                geometry: el.coordinates,
                options: {
                  preset: 'islands#greenDotIcon',
                  iconColor: '#d020d6'
                },
                id: el.id,
                properties: {
                  hintContent: `Содержание всплывающей подсказки, id: ${el.id}`,
                  balloonContent: `Пункт выдачи с id: ${el.id}`
                },
                schedule: '',
                address: ''
              });
            });
            if (points.length < 50) {
              this.showDetails = showDetailsType.loading;
              return this.selfRansom.getDetailsData(idArray);
            } else {
              this.showDetails = showDetailsType.tooMany;
              return of(null);
            }
          } else {
            this.showDetails = showDetailsType.loading;
            return of(null);
          }
        })
      )
      .subscribe((result: any) => {
        if (result?.value) {
          this.showDetails = showDetailsType.ok;
          for (let i = 0; i < idArray.length; i++) {
            const detail = result.value[idArray[i]];
            const placemark = this.placemarks.find(
              (el) => el.id === idArray[i]
            );
            if (placemark) {
              const button = `<button id="${placemark.id}" class="balloon-button">Выбрать</button>`;
              placemark.schedule = detail.workTime;
              placemark.address = detail.address;
              placemark.properties = {
                hintContent: `Адрес: ${detail.address}`,
                balloonContent: `Адрес: ${detail.address},<br>время работы: ${detail.workTime}<br><br>${button}`
              };
            }
          }
        }
        this.ref.detectChanges();
      });
  }

  openBalloon($event: any, arg: number) {
    if (this.showDetails === showDetailsType.ok) {
      this.loadingGuard = true;
      const uniqueClass = `balloon-button-${uuidv4()}`;
      this.removeEventListener = this.renderer.listen(
        document.getElementById(String(arg)),
        'click',
        (event) => {
          event.preventDefault();
          this.choosePVZ(arg);
          this.removeEventListener();
        }
      );

      const placemark = this.placemarks.find((el) => el.id === arg);
      if (placemark) {
        const button = `<button id="${placemark.id}" class="balloon-button ${uniqueClass}">Выбрать</button>`;
        const modifiedProperties = {
          hintContent: `Адрес: ${placemark.address}`,
          balloonContent: `Адрес: ${placemark.address},<br>время работы: ${placemark.schedule}<br><br>${button}`
        };
        placemark.properties = modifiedProperties;
      }
    } else {
      this.zoom = 16;
      this.selfRansom.centerPoint$.next([
        $event.target.geometry._coordinates[0],
        $event.target.geometry._coordinates[1]
      ]);
    }
  }

  closeBalloon() {
    this.loadingGuard = false;
  }

  choosePVZ = (id: number) => {
    const address: Placemark = this.placemarks.find((el) => el.id === id)!;
    this.context.completeWith({
      addressId: id,
      addressName: address.address || ''
    });
    this.selfRansom.centerPoint$.next(address.geometry);
    this.showDetails = showDetailsType.loading;

    this.placemarks.forEach((placemark) => {
      if (placemark.id !== id) {
        placemark.schedule = '';
        placemark.address = '';
        placemark.properties = {
          hintContent: `Содержание всплывающей подсказки, id: ${placemark.id}`,
          balloonContent: `Пункт выдачи с id: ${placemark.id}`
        };
      }
    });
  };

  onMapChanged(event: any) {
    if (event.target._zoom <= 10) {
      this.showDetails = showDetailsType.tooMany;
    }
    setTimeout(() => {
      if (!this.loadingGuard && event.target._zoom >= 11) {
        this.placemarks = [];
        this.selfRansom.findNearPoints(
          event.target._bounds[0],
          event.target._bounds[1]
        );
      }
    }, 100);
  }

  showLocation(item: Placemark) {
    this.zoom = 18;
    this.selfRansom.centerPoint$.next(item.geometry);
  }
}

enum showDetailsType {
  loading = 'loading',
  ok = 'ok',
  tooMany = 'tooMany'
}
