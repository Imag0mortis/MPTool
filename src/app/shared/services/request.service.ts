import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  CampaignObj,
  CampaingsTableObjSave,
  Liker,
  LikerBasketTask,
  LikerFavoritesTask,
  LikerQuestionsTask,
  LikerReviewsTask,
  Referal,
  tariffOptions,
  TokenTask,
  WbApi
} from '../interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public loginRequest(mail: string, password: string) {
    return this.http.post(environment.siteUrl + '/api/login.php', {
      mail: mail,
      password: password
    });
  }

  public registerRequest(
    mail: string,
    password: string,
    phone: number,
    telegram: string
  ) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    return this.http.post(
      environment.siteUrl + '/api/reg.php',
      {
        mail: mail,
        password: password,
        phone: phone,
        telegram: telegram
      },
      httpOptions
    );
  }

  public restoreRequest(email: string) {
    return this.http.post(environment.siteUrl + '/api/password_recover.php', {
      email: email
    });
  }

  public restoreChangeRequest(password: string, link: string, csrf: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    return this.http.put(
      environment.siteUrl + '/api/password_recover.php',
      {
        password: password,
        recovery: link,
        csrf: csrf
      },
      httpOptions
    );
  }

  public getReviewsByFilter(
    page: number,
    pageSize: number,
    filter_state: number,
    searchValue: any
  ) {
    let url =
      environment.api +
      `wb_liker_selfbuy_get_feedbacks.php?page=${1}&pageSize=${20}&filter_state=${filter_state}`;
    if (searchValue) {
      switch (searchValue) {
        case 'по номеру выкупа':
          url += `&task_id=${searchValue}`;
          break;
        case 'по артикулу':
          url += `&sku=${searchValue}`;
          break;
        case 'по имени':
          url += `&skuName=${searchValue}`;
          break;
        case 'по дате создания':
          url += `&dateCreatedMin=${searchValue}&dateCreatedMax=${searchValue}`;
          break;
        case 'по дате публикации':
          url += `&datePublishedMin=${searchValue}&datePublishedMax=${searchValue}`;
          break;
        default:
          break;
      }
    }

    return this.http.get(url);
  }

  public getAvailibleReviewsByFilter(
    page: number,
    pageSize: number,
    type: number,
    filter: string,
    sku?: number,
    skuName?: string
  ) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('type', type.toString())
      .set('filter', filter);

    if (sku) {
      params = params.set('sku', sku.toString());
    }
    if (skuName) {
      params = params.set('skuName', skuName);
    }

    return this.http.get(environment.api + 'wb_liker_available_feedbacks.php', {
      params
    });
  }

  public getUserInfo() {
    return this.http.get(environment.api + 'get_user_info.php');
  }

  public getAds(
    userId: number,
    page: number,
    pagesize: number,
    state: string,
    type: string
  ) {
    return this.http.get(
      environment.api +
        `wbcampaigns/campaigns.php?lk=${userId}&page=${page}&pagesize=${pagesize}${
          state ? '&state=' + JSON.stringify(state) : ''
        }${type ? '&type=' + JSON.stringify(type) : ''}`
    );
  }

  // старая ручка
  //public getCampaign(wb_cmp: number, sync: boolean) {
  //return this.http.get(environment.api + `get_campaign.php?wb_cmp=${wb_cmp}&sync=${sync}`)
  //}

  public getCampaign(wb_cmp: number) {
    return this.http.get(
      environment.api + `wbcampaigns/campaign.php?wb_cmp=${wb_cmp}`
    );
  }

  //ввод api ключа WB

  public setWbApiKey(body: WbApi) {
    return this.http.post(environment.api + 'wbcampaigns/wbAPIKey.php', body);
  }

  public getWbApiKey() {
    return this.http.get<WbApi[]>(environment.api + 'wbcampaigns/wbAPIKey.php');
  }

  public syncAds(lkId: number) {
    return this.http.get(environment.api + 'wbcampaigns/sync.php?lk');
  }

  public saveCampaign(campaign: CampaignObj | CampaingsTableObjSave) {
    return this.http.post(
      environment.api + 'wbcampaigns/saveCampaign.php',
      campaign
    );
  }

  public getPositions(sku: any, query: any, page: any) {
    return this.http.get(
      environment.api +
        `catalog_query.php?page=${page || 1}&pagesize=10${
          sku ? '&sku=' + JSON.stringify(sku) : ''
        }${query ? '&query=' + JSON.stringify(query) : ''}`
    );
  }

  public setNewSearchQuery(body: any) {
    return this.http.post(environment.api + 'catalog_query.php', body);
  }

  public getLiker(page: number, size: number) {
    return this.http.get(
      environment.api + `wb_liker.php?page=${page}&pageSize=${size}`
    );
  }

  public postLiker(body: Liker) {
    return this.http.post(environment.api + 'wb_liker.php', body);
  }

  public cancelLiker(body: any) {
    return this.http.put(environment.api + 'wb_liker.php', body);
  }

  public getRealBids(query: string) {
    return this.http.get(environment.api + `get_real_bids.php?query=${query}`);
  }

  public getSelfpurchase(query: string, position: any) {
    return this.http.get(
      environment.api + `get_selfpurchase.php?query=${query}&pos=${position}`
    );
  }

  public getCalcRating(sku: string) {
    return this.http.get(environment.api + `calc_rating.php?sku=${sku}`);
  }

  public setNewProfileData(body: any) {
    return this.http.put(environment.api + 'update_profile.php', body);
  }

  public setNewPassword(body: any) {
    return this.http.put(environment.api + 'change_password.php', body);
  }

  public getAllGeoPoints() {
    return this.http.get(
      environment.api + 'wb_retrieve_data.php?data=get_all_pickups'
    );
  }

  public getCurrentAdress(arg: number[]) {
    const body = {
      data: 'get_address_pickups',
      postdata: JSON.stringify(arg)
    };
    return this.http.post(environment.api + 'wb_retrieve_data.php', body);
  }

  public payment(body: any) {
    return this.http.post(environment.api + 'pay.php', body);
  }

  public checkSKU(sku: number): Observable<any> {
    return this.http.get(
      environment.api + `wb_liker_selfbuy_check.php?sku=${sku}`
    );
  }

  public createSelfransomTask(body: any) {
    return this.http.post(environment.api + 'wb_liker_selfbuy.php', body);
  }

  public getAllSelfransomItem(
    page: number,
    pageSize: number,
    filter?: number,
    ids = ''
  ) {
    return this.http.get(
      environment.api +
        `wb_liker_selfbuy.php?page=${page}&pageSize=${pageSize}&state_filter=${filter}&ids=[${ids}]`
    );
  }

  public getSelfRansomPositions() {
    return this.http.get(environment.api + 'wb_liker_selfbuy_get_task.php');
  }

  public createBasketTask(body: LikerBasketTask) {
    return this.http.post(environment.api + 'wb_liker_basket.php', body);
  }

  public getBasketTask(page: number, pageSize: number) {
    return this.http.get(
      environment.api + `wb_liker_basket.php?page=${page}&pageSize=${pageSize}`
    );
  }

  public changeBasketTask(body: any) {
    return this.http.put(environment.api + 'wb_liker_basket.php', body);
  }

  public createFavoritesTask(body: LikerFavoritesTask) {
    return this.http.post(environment.api + 'wb_liker_favourite.php', body);
  }

  public getFavoritesTask(page: number, pageSize: number) {
    return this.http.get(
      environment.api +
        `wb_liker_favourite.php?page=${page}&pageSize=${pageSize}`
    );
  }

  public changeFavoritesTask(body: any) {
    return this.http.put(environment.api + 'wb_liker_favourite.php', body);
  }

  public createQuestionsTask(body: LikerQuestionsTask) {
    return this.http.post(environment.api + 'wb_liker_questions.php', body);
  }

  public getQuestionsTask(page: number, pageSize: number) {
    return this.http.get(
      environment.api +
        `wb_liker_questions.php?page=${page}&pageSize=${pageSize}`
    );
  }

  public changeQuestionsTask(body: any) {
    return this.http.put(environment.api + 'wb_liker_questions.php', body);
  }

  public getSelfransomTask(id: number) {
    return this.http.get(
      environment.api + `wb_liker_selfbuy_get_task.php?task_id=${id}`
    );
  }

  public getRequestQr(id: number) {
    return this.http.get(
      environment.api + `wb_liker_selfbuy_request_qr.php?buy_id=${id}`
    );
  }

  public getCheckQr(id: number) {
    return this.http.get(
      environment.api + `wb_liker_selfbuy_check_qr_v2.php?buy_id=${id}`
    );
  }

  public cancelRansomTask(id: number) {
    const body = {
      buy_id: id,
      action: 'cancel'
    };
    return this.http.put(environment.api + 'wb_liker_selfbuy.php', body);
  }

  public getTarifInfo() {
    return this.http.get(environment.api + 'get_tarif_info.php');
  }

  public setTariff(body: tariffOptions) {
    return this.http.post(
      environment.api + 'wb_campaigns_subscription.php',
      body
    );
  }

  public getAvailableFeedbacks(
    page: number,
    pageSize: number,
    sku: number | string = '',
    skuName = ''
  ) {
    return this.http.get(
      environment.api +
        `wb_liker_available_feedbacks.php?page=${page}&pageSize=${pageSize}&sku=${sku}&skuName=${skuName}`
    );
  }

  public postReviews(body: LikerReviewsTask) {
    return this.http.post(
      environment.api + 'wb_liker_selfbuy_add_feedback.php',
      body
    );
  }

  public getRewiews(
    page: number,
    pageSize: number,
    sku: number | string = '',
    skuName = '',
    task_id: number | string = '',
    datePublishedMin: number | string = '',
    datePublishedMax: number | string = ''
  ) {
    return this.http.get(
      environment.api +
        `wb_liker_selfbuy_get_feedbacks.php?page=${page}&pageSize=${pageSize}&sku=${sku}&skuName=${skuName}&task_id=${task_id}&dateCreatedMin=${datePublishedMin}&dateCreatedMax=${datePublishedMax}&filter_state=1`
    );
  }

  public getAwaitingRewiews(
    page: number,
    pageSize: number,
    sku: number | string = '',
    skuName = '',
    task_id: number | string = '',
    dateCreatedMin: number | string = '',
    dateCreatedMax: number | string = ''
  ) {
    return this.http.get(
      environment.api +
        `wb_liker_selfbuy_get_feedbacks.php?page=${page}&pageSize=${pageSize}&sku=${sku}&skuName=${skuName}&task_id=${task_id}&dateCreatedMin=${dateCreatedMin}&dateCreatedMax=${dateCreatedMax}&filter_state=0`
    );
  }

  public getCanceledRewiews(
    page: number,
    pageSize: number,
    sku: number | string = '',
    skuName = '',
    task_id: number | string = '',
    dateCreatedMin: number | string = '',
    dateCreatedMax: number | string = ''
  ) {
    return this.http.get(
      environment.api +
        `wb_liker_selfbuy_get_feedbacks.php?page=${page}&pageSize=${pageSize}&sku=${sku}&skuName=${skuName}&task_id=${task_id}&dateCreatedMin=${dateCreatedMin}&dateCreatedMax=${dateCreatedMax}&filter_state=3`
    );
  }

  public getErrorRewiews(
    page: number,
    pageSize: number,
    sku: number | string = '',
    skuName = '',
    task_id: number | string = '',
    dateCreatedMin: number | string = '',
    dateCreatedMax: number | string = ''
  ) {
    return this.http.get(
      environment.api +
        `wb_liker_selfbuy_get_feedbacks.php?page=${page}&pageSize=${pageSize}&sku=${sku}&skuName=${skuName}&task_id=${task_id}&dateCreatedMin=${dateCreatedMin}&dateCreatedMax=${dateCreatedMax}&filter_state=2`
    );
  }

  public getAllRewiews(
    page: number,
    pageSize: number,
    sku: number | string = '',
    skuName = '',
    task_id: number | string = '',
    dateCreatedMin: number | string = '',
    dateCreatedMax: number | string = ''
  ) {
    return this.http.get(
      environment.api +
        `wb_liker_selfbuy_get_feedbacks.php?page=${page}&pageSize=${pageSize}&sku=${sku}&skuName=${skuName}&task_id=${task_id}&dateCreatedMin=${dateCreatedMin}&dateCreatedMax=${dateCreatedMax}&filter_state=-1`
    );
  }

  public cancelReview(quantity: number) {
    const body = {
      buy_id: quantity
    };
    return this.http.post(environment.api + 'wb_cancel_feedback.php', body);
  }

  public buyPackages(type: string, quantity: number) {
    const body = {
      package: type,
      package_count: quantity
    };
    return this.http.post(environment.api + 'wb_buy_packages.php', body);
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  public buySelfransomPackages(type: string, quantity: number) {
    const body = {
      package: type,
      package_count: quantity
    };
    return this.http.post(environment.api + 'wb_buy_packages.php', body);
  }

  public referalWithdrawal() {
    const body = {
      action: 'string'
    };
    return this.http.put(environment.api + 'invite_links.php', body);
  }

  public postReferal(body: Referal) {
    return this.http.post(environment.api + 'invite_links.php', body);
  }

  public getReferalInfo(page: number, pageSize: number) {
    return this.http.get(
      environment.api + `invite_links.php?page=${page}&pageSize=${pageSize}`
    );
  }

  public createLink(quantity: number, type: string) {
    const body = {
      date_created: quantity,
      hits: quantity,
      id: quantity,
      link: type,
      registers: quantity,
      sum_paid: quantity
    };
    return this.http.post(environment.api + 'invite_links.php', body);
  }

  public deleteLink(link: string) {
    const linkId = link.split('/').pop();
    if (linkId) {
      return this.http.delete(
        `${environment.api}invite_links.php?link=${encodeURIComponent(linkId)}`
      );
    } else {
      console.error('Не удалось извлечь идентификатор ссылки');
      return of();
    }
  }

  public getLink() {
    return this.http.get(
      environment.api + 'wbcampaigns/sync.php.php?lk=/invite/<link>'
    );
  }

  public postToken(body: TokenTask) {
    return this.http.post(environment.api + 'set_wbs_token.php', body);
  }

  public checkPayment(buyID: number) {
    const body = {
      buy_id: buyID
    };
    return this.http.post(
      environment.api + 'wb_liker_selfbuy_check_payment.php',
      body
    );
  }

  public balanceWithdrawali(body: any) {
    return this.http.put(environment.api + 'invite_links.php', body);
  }

  public createTgLink(type: string) {
    const body = {
      tglink: type
    };
    return this.http.post(environment.api + 'create_tg_link.php', body);
  }

  public removeTgLink(telegram_id: number) {
    const body = {
      telegram_id: telegram_id,
      action: 'remove_one'
    };
    return this.http.put(environment.api + 'remove_linked_tg.php', body);
  }

  public removeAllTgLink(telegram_id: number) {
    const body = {
      telegram_id: telegram_id,
      action: 'remove_all'
    };
    return this.http.put(environment.api + 'remove_linked_tg.php', body);
  }

  public getTransactions(
    page: number | string = '',
    pageSize: number | string = ''
  ) {
    return this.http.get(
      environment.api + `get_wallet_log.php?page=${page}&pageSize=${pageSize}`
    );
  }

  //Добавим метод вывода списка выкупов по артикулу
  public getRansomsBySku(sku: number | string | null) {
    return this.http.get(
      environment.api + `availableFeedbacksInfo.php?sku=${sku}`
    );
  }
}
