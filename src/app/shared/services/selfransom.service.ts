import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class SelfransomService {
  public findNearPoints(minPoint: number[], maxPoint: number[]) {
    const filteredPoints = this.allPoints.filter((el: any) => {
      if (
        el.coordinates[1] > minPoint[1] &&
        el.coordinates[1] < maxPoint[1] &&
        el.coordinates[0] > minPoint[0] &&
        el.coordinates[0] < maxPoint[0]
      ) {
        return el;
      }
    });

    this.nearPoints$.next(filteredPoints);
  }
  
  allPoints: any;
  nearPoints$: BehaviorSubject<any> = new BehaviorSubject(null);
  currentPosition: any;
  allPointsReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  centerPoint$: BehaviorSubject<any> = new BehaviorSubject([
    55.759211, 37.609627
  ]);

  constructor(private request: RequestService) {}

//  ВЫЗЫВАЕТ
getAllMapsPoints() {
  this.request
    .getAllGeoPoints()
    .pipe()
    .subscribe((r: any) => {
      console.log("Ау",r);
      this.allPoints = r.value.model;
      this.allPointsReady$.next(true);
      const center = this.centerPoint$.value;
      this.findNearPoints(
        [center[0] - 0.015, center[1] - 0.035],
        [center[0] + 0.015, center[1] + 0.035]
      );
    });
}
  // findNearPoints(minPoint: number[], maxPoint: number[]) {
    

  findCurrentPoint(arg: number) {
    return this.allPoints.find((el: any) => el.id === arg);
  }

  getUserGeoLocation() {
    this.getPosition().then(
      (pos) => {
        this.centerPoint$.next([pos.lat, pos.lng]);
        this.getAllMapsPoints();
      },
      (reject) => {
        this.getAllMapsPoints();
      }
    );
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getDetailsData(arg: number[]) {
    return this.request.getCurrentAdress(arg);
  }

  
}
