import http from './http';
import type { FundEstimate, MarketIndex, FundList } from '../types';

// 获取市场行情
export const fetchMarketIndex = async () => {
  try {
    const response = await http.post<MarketIndex[]>('/fund/get-market-index-list', {}, {});
    return response;
  } catch (error) {
    console.error('Error fetching market index:', error);
    throw error;
  }
};

// 获取持仓列表
export const fetchFundList = async () => {
  try {
    const response = await http.post<FundList>('/fund/get-hold-list', {
      unionId: "o896o5_uEASPnPXVQUp95igWdHzU",
      version: "3.5.6.1",
      clientType: "MPN"
    });
    return response;
  } catch (error) {
    console.error('Error fetching fund list:', error);
    throw error;
  }
};

// 获取基金估值
export const fetchFundEstimates = async (codes: string[]) => {
  try {
    const response = await http.post<Record<string, FundEstimate>>('/fund/estimate', { codes });
    return response;
  } catch (error) {
    console.error('Error fetching fund estimates:', error);
    throw error;
  }
};