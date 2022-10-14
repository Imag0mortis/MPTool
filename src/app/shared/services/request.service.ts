import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }

  public loginRequest(mail: string, password: string) {
    return this.http.post(environment.api + '/api/login.php', {
      "mail": mail,
      "password": password
    })
  }

  public registerRequest(mail: string, password: string) {
    return this.http.post(environment.api + '/api/reg.php', {
      "mail": mail,
      "password": password
    })
  }

  public getUserInfo() {
    return this.http.get(environment.api + '/lk/v1/get_user_info.php')
  }
 
  public getAds(userId: number, page: number, pagesize: number, state: string, type: string) {
    return this.http.get(environment.api + `/lk/v1/get_ads.php?lk=${userId}&page=${page}&pagesize=${pagesize}${state ? "&state=" + JSON.stringify(state) : ""}${type ? "&type=" + JSON.stringify(type) : ""}`)
  }

  public getCampaign(ad_campaign: number, sync: boolean) {
    return this.http.get(environment.api + `/lk/v1/get_campaign.php?ad_campaign=${ad_campaign}&sync=${sync}`)
  }

  public syncAds(lkId: number) {
    return this.http.get(environment.api + `/lk/v1/sync_ads.php?lk=${lkId}`)
  }

  public saveCampaign(campaign: any) {
    return this.http.post(environment.api + "/lk/v1/save_ad.php", campaign)
  }

  public getPositions() {
    return this.http.get(environment.api + `/lk/v1/catalog_query.php?sku=1&query=%D1%83%D1%83&page=1&pagesize=10`)
  } 

}
