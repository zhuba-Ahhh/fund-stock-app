import http from './http';
import type { MarketIndexResponse, FundListResponse } from '../types';

export const fetchMarketIndex = async () => {
  try {
    // 使用 MarketIndexResponse['data'] 作为泛型 T
    // http.post 返回 Promise<ApiResponse<T>>
    const response = await http.post<MarketIndexResponse['data']>('/get-market-index-list', {}, {});
    return response;
  } catch (error) {
    console.error('Error fetching market index:', error);
    throw error;
  }
};

export const fetchFundList = async () => {
  try {
    const response = await http.post<FundListResponse['data']>('/get-hold-list', {
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
