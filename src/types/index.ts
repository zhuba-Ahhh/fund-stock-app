export interface MarketIndex {
  /** 指数代码 */
  code: string;
  /** 市场类型 */
  market: string;
  /** 指数名称 */
  name: string;
  /** 扩展代码 */
  extraCode: string;
  /** 主题类型 */
  themeType: string;
  /** 涨跌幅百分比 */
  percent: number;
  /** 当前点位 */
  current: number;
  /** 涨跌额 */
  chg: number;
}

export interface FundItem {
  /** 唯一标识 */
  _id: string;
  /** 基金代码 */
  code: string;
  /** 持仓金额 */
  money: number;
  /** 本金 */
  headMoney: number;
  /** 持仓收益 */
  earnings: number;
  /** 累计收益 */
  sumEarning: number;
  /** 当日收益 */
  currentEarning: number;
  /** 当日收益率 */
  dailyYield: number;
  /** 数据日期 */
  date: string;
  /** 净值更新时间 */
  updateNavTime: string;
  /** 最新净值 */
  nav: number | string;
  /** 是否已更新 */
  isUpdate: boolean;
  /** 基金基础信息 */
  data: {
    /** 基金名称 */
    name: string;
    /** 投资风格 */
    investStyle: string;
    /** 投资类型 */
    investType: string;
    /** 投资价值 */
    investWorth: string | null;
    /** 操作类型 */
    operateType: string;
    /** 风险等级 */
    risk: string | null;
    /** 是否是 QDII 基金 */
    isQDII: boolean;
    /** 相关行业板块 */
    relatedIndustryV2: Array<{
      /** 板块名称 */
      themeName: string;
      /** 板块涨跌幅 */
      change: number;
      /** 扩展代码 */
      extraCode: string;
      /** 来源 */
      from: string;
    }>;
  };
}

export interface MarketIndexResponse {
  /** 状态码 */
  code: number;
  /** 消息 */
  msg: string;
  /** 数据 */
  data: MarketIndex[];
}

export interface FundList {
  /** 基金列表 */
  list: FundItem[];
  /** 附加信息 */
  info: {
    /** 当前时间 */
    now: string;
    /** 持仓日期 (MM-DD) */
    holdDateMD: string;
    /** 是否交易日 */
    isTradingDate: boolean;
  };
};

export interface FundEstimate {
  /** 基金代码 */
  fund_code: string;
  /** 基金名称 */
  fund_name?: string;
  /** 估算净值 */
  estimate_nav?: string;
  /** 估算涨幅 */
  estimate_growth?: string;
  /** 估算时间 */
  estimate_time?: string;
  /** 最新净值 */
  latest_nav?: string;
  /** 最新净值日期 */
  latest_nav_date?: string;
  /** 是否来自缓存 */
  from_cache?: boolean;
  /** 错误信息 */
  error?: string;
}