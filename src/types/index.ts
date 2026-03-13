export interface MarketIndex {
  code: string;
  market: string;
  name: string;
  extraCode: string;
  themeType: string;
  percent: number;
  current: number;
  chg: number;
}

export interface FundItem {
  _id: string;
  code: string;
  money: number;
  headMoney: number;
  earnings: number;
  sumEarning: number;
  currentEarning: number;
  dailyYield: number;
  date: string;
  updateNavTime: string;
  nav: number | string;
  isUpdate: boolean;
  data: {
    name: string;
    investStyle: string;
    investType: string;
    investWorth: string | null;
    operateType: string;
    risk: string | null;
    isQDII: boolean;
    relatedIndustryV2: Array<{
      themeName: string;
      change: number;
      extraCode: string;
      from: string;
    }>;
  };
}

export interface MarketIndexResponse {
  code: number;
  msg: string;
  data: MarketIndex[];
}

export interface FundList {
  list: FundItem[];
  info: {
    now: string;
    holdDateMD: string;
    isTradingDate: boolean;
  };
};

export interface FundEstimate {
  fund_code: string;
  fund_name?: string;
  estimate_nav?: string;
  estimate_growth?: string;
  estimate_time?: string;
  latest_nav?: string;
  latest_nav_date?: string;
  from_cache?: boolean;
  error?: string;
}