import axios from 'axios';
import type { MarketIndexResponse, FundListResponse } from '../types';

const api = axios.create({
  baseURL: 'https://api.xiaobeiyangji.com/yangji-api/api',
  headers: {
    'Content-Type': 'application/json',
    'xweb_xhr': '1',
  },
});

export const fetchMarketIndex = async () => {
  try {
    const response = await api.post<MarketIndexResponse>('/get-market-index-list', {}, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching market index:', error);
    throw error;
  }
};

export const fetchFundList = async () => {
  try {
    const response = await api.post<FundListResponse>('/get-hold-list', {
      unionId: "o896o5_uEASPnPXVQUp95igWdHzU",
      version: "3.5.6.1",
      clientType: "MPN"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fund list:', error);
    throw error;
  }
};
