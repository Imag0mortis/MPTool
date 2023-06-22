export interface Liker {
  sku: string;
  query: string;
  name: string;
  feedback: string;
  likes: number;
  isLike: boolean;
}

export interface LikerBasketTask {
  sku: number;
  query: string;
  hours: number;
  likes: number;
}

export interface LikerFavoritesTask {
  link: string;
  hours: number;
  likes: number;
}

export interface LikerQuestionsTask {
  sku: number;
  question: string;
  sex: string;
}

export interface WbPosition {
  imgLink: string;
  name: string;
  price: number;
  sizes: [
    {
      Key: string;
      Value: string;
    }
  ];
  sku: number;
  quantity: number;
  request: string;
  address?: {
    addressId: number;
    addressName: string;
  };
  sex?: {
    value: number;
    name: string;
  };
  size?: any;
}

export interface tariffOptions {
  tariff_id: number;
  months: number;
  confirm: boolean;
}

export interface TokenTask {
  supplier_id: string;
  wb_token: string;
}

export interface Referal {
  date_created: number;
  hits: number;
  id: number;
  link: string;
  registers: number;
  sum_paid: number;
}

export interface LikerReviewsTask {
  sku: number;
  buy_id: number;
  feedback: string;
  sex: string;
  rating: number;
  time: number;
  is_any_for_task: boolean;
  size_match: string;
  photo: string[][];
}

export interface WbApi {
  companyName: string;
  apiKey: string;
  lkID: number;
}

export interface TargetBid {
  targetBid: number;
  targetPlace: number;
  min_place: number;
  targetID: number;
}

export interface CampaignObj {
  campaign_id: number;
  enable: boolean;
  use_optimizer: boolean;
  keyword: null | string;
  target_bid: TargetBid[];
}

export interface CampaingsTableObjSave {
  campaign_id: number;
  enable: boolean;
}
